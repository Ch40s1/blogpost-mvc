const { BlogPost, User, BlogComment } = require('../models');
const router = require('express').Router();
const withAuth = require('../utils/auth');

// router.get('/', async (req, res) => {
//   try {
//     // Fetch all blog posts and their related User data
//     const blogPostData = await BlogPost.findAll({
//       include: [{ model: User, attributes: ['name'] }],
//     });

//     // Fetch all comments
//     const commentData = await BlogComment.findAll();

//     // Map the retrieved data to plain objects
//     const blogposts = blogPostData.map((blogpost) => blogpost.get({ plain: true }));
//     const comments = commentData.map((comment) => comment.get({ plain: true }));

//     res.render('home', {
//       blogposts,
//       comments, // Pass the comments to the template
//       logged_in: req.session.logged_in,
//       user_name: req.session.user_name,
//     });
//   } catch (err) {
//     console.error('Error fetching blog post data:', err);
//     res.status(500).json(err);
//   }
// });



router.get('/', async (req, res) => {
  try {
    // Fetch all blog posts and include their related User data and associated comments
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: BlogComment,
          as: 'comments', // Use the correct alias name
          attributes: ['description'],
        },
      ],
    });

    // Map the retrieved data to plain objects
    const blogposts = blogPostData.map((blogpost) => blogpost.get({ plain: true }));

    console.log('Blog Posts:', blogposts);

    res.render('home', {
      blogposts,
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
    });
  } catch (err) {
    console.error('Error fetching blog post data:', err);
    res.status(500).json(err);
  }
});



router.get('/login', (req, res) => {
  res.render('login')
})
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: BlogPost }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
      user_name: req.session.user_name,
      user_email: req.session.user_email,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
User
router.get('/blogpost/:id', async (req, res) => {
  try {

    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['name'] }],
    });

    if (!blogPostData) {
      res.status(404).json({ message: 'Blog post not found' });
      return;
    }

    const blogpost = blogPostData.get({ plain: true });

    res.render('blogpost', {
      blogpost,
      logged_in: req.session.logged_in,
      user_name: req.session.user_name,
    });
  } catch (err) {
    console.error('Error fetching blog post data:', err);
    res.status(500).json(err);
  }
});

router.get('/comments', async (req, res) => {
  try {
    // Fetch all comments from the database
    const comments = await BlogComment.findAll();

    // Send the comments data as a JSON response
    res.json(comments);
  } catch (err) {
    console.error('Error fetching comments data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;
