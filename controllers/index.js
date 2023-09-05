const router = require('express').Router();

// variable for the exports on the homepage
const homepage = require('./homepage');

// base endpoint for the homepage
router.use('/', homepage);

//export the router
module.exports = router;
