const router = require('express').Router();

// variable for the exports on the homepage
const homepage = require('./homepage');
const apiRoutes = require('./api');

// base endpoint for the homepage
router.use('/', homepage);
router.use('/api', apiRoutes);

//export the router
module.exports = router;
