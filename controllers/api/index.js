const router = require('express').Router();
const blogRoutes = require('./blogRoutes');
const userPosts = require('./userPost');

router.use('/users', blogRoutes);
router.use('/blogposts',userPosts);

module.exports = router;
