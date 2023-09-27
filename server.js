const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./controllers');
const session = require('express-session');
const blogPostData = require('./seeds/postData.json');
const userData = require('./seeds/userData.json')
const { BlogPost, User } = require('./models');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// start the express app
const app = express();
//define the port
const PORT = process.env.PORT || 3001;

// create handlebars
const hbs = exphbs.create({helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
//regiter it in the express server
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//middleware for server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// use routes
app.use(routes);
//app listens
sequelize.sync({ force: true }).then(async () => {
  try {
    // Create user records
    for (const user of userData) {
      await User.create(user);
    }

    // Create blog post records
    for (const blogPost of blogPostData) {
      await BlogPost.create(blogPost);
    }

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error('Error seeding data:', error);
  }
});
