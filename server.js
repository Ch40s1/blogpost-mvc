const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./controllers');
const session = require('express-session');
const blogPostData = require('./seeds/postData.json');
const userData = require('./seeds/userData.json')
const commentData = require('./seeds/commentData.json');
const { BlogPost, User, BlogComment } = require('./models');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// start the express app
const app = express();
//define the port
const PORT = process.env.PORT || 3001;

// create handlebars
const hbs = exphbs.create({ helpers });

// session cookie for 5 minutes
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

// this seeds the data every and the app listens
sequelize.sync({ force: false }).then(async () => {
  try {
    // Create user records
    const createdUsers = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    // Create blog post records
    const createdBlogPosts = await BlogPost.bulkCreate(blogPostData, {
      returning: true,
    });

    // Create comment records with random user and blog post IDs
    for (const comment of commentData) {
      const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
      const randomBlogPost = createdBlogPosts[Math.floor(Math.random() * createdBlogPosts.length)];

      // Assign random user and blog post IDs to the comment
      comment.user_id = randomUser.id;
      comment.blogpost_id = randomBlogPost.id;

      await BlogComment.create(comment);
    }

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error('Error seeding data:', error);
  }
});
