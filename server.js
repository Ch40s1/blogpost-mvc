const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

//use the routes on the index.js
const routes = require('./controllers');

// start the express app
const app = express();
//define the port
const PORT = process.env.PORT || 3000;

// create handlebars
const hbs = exphbs.create({ });

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
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
})
