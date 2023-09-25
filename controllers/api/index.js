const router = require('express').Router();
const blogRoutes = require('./blogRoutes');

router.use('/users', blogRoutes);

module.exports = router;
