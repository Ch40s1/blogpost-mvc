const router = require('express').Router();

// get basic homepage
router.get('/', (req, res) => {
  res.render('home');
});

router.get('/login', (req, res) => {
  res.render('login')
})

module.exports = router;