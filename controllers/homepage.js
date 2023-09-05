const router = require('express').Router();

// get basic homepage
router.get('/', (req, res) => {
  res.render('home');
});

module.exports = router;
