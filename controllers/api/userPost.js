const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { BlogPost } = require('../../models');

router.post('/', withAuth, async (req, res) => {
  try{
    const newBlogPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newBlogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});
router.delete('/:id', withAuth, async (req, res) =>{
  try{
    const blogPostData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if(!blogPostData){
      res.starus(404).json({message: 'No blogpost with this id!'});
      return;
    }
    res.status(200).json(blogPostData);
  } catch (err){
    res.status(500).json(err);
  }
});
router.post('/comments', async (req, res) => {
  try {
    const { text, blogpostId } = req.body; // Extract comment text and blog post ID from the request body

    // Create the comment in the database and associate it with the specified blog post
    const comment = await BlogComment.create({
      description: text,
      blog_id: blogpostId,
      user_id: req.session.user_id, // Set the user_id as needed
    });

    // Respond with the newly created comment
    res.json(comment);
  } catch (err) {
    console.error('Error creating comment:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
