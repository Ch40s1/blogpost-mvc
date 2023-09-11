// const BlogPost = require('../models/blogpost');
const { BlogPost, User } = require('../models');
const router = require('express').Router();

// Get basic homepage with blog post data
router.get('/', async (req, res) => {
  try {
    // Fetch all blog posts and include related User data
    const blogPostData = await BlogPost.findAll({
      // Include User model to get the author's name
      include: [{ model: User, attributes: ['name'] }],
    });

    // Map the retrieved data to plain objects
    const blogposts = blogPostData.map((blogpost) => blogpost.get({ plain: true }));

    // Render the 'home' template and pass the blogpost data to it
    res.render('home', { blogposts });
  } catch (err) {
    console.error('Error fetching blog post data:', err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/login', (req, res) => {
  res.render('login')
})

module.exports = router;
