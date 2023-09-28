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
router.post("/api/comments", async (req, res) => {
  try {
    const { text, blogpostId } = req.body;

    // Create a new comment in the database
    const newComment = await BlogComment.create({
      description: text,
      blog_id: blogpostId,
      user_id: req.session.user_id, // Assuming you have a user session with user_id
    });

    // Respond with the created comment data (you can customize this)
    res.json({ text: newComment.description });
  } catch (error) {
    console.error("Error submitting comment:", error);
    res.status(500).json({ error: "Unable to submit comment" });
  }
});

module.exports = router;
