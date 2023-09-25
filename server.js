const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./controllers');
const session = require('express-session');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// start the express app
const app = express();
//define the port
const PORT = process.env.PORT || 3001;

// create handlebars
const hbs = exphbs.create({ });

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
// sequelize.sync({ force: false }).then(()=>{
//   app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}/`);
//   })
// });
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
})
