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


module.exports = router;
