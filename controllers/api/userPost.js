const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { BlogPost, BlogComment } = require('../../models');

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
router.post("/comments", withAuth,  async (req, res) => {
  try {
    const { description, blogpostId } = req.body;

    // Create a new comment in the database
    const newComment = await BlogComment.create({
      description: description,
      blogpost_id: blogpostId,
      user_id: req.session.user_id,
    });

    console.log({ description: newComment.description }); // Debugging
    res.json({ description: newComment.description });

  } catch (error) {
    console.error("Error submitting comment:", error);
    res.status(500).json({ error: "Unable to submit comment" });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, description } = req.body;
    const postId = req.params.id;

    // Find the blog post by ID and update its title and description
    const updatedPost = await BlogPost.update(
      {
        title,
        description,
      },
      {
        where: { id: postId },
      }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
