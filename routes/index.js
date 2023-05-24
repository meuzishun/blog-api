const router = require('express').Router();
const posts = require('./posts');
const comments = require('./comments');

router.post('/register', (req, res) => {
  return res.status(200).json({
    msg: 'submitting register data...',
  });
});

router.post('/login', (req, res) => {
  return res.status(200).json({
    msg: 'submitting login data...',
  });
});

router.use('/posts', posts);
router.use('/comments', comments);

module.exports = router;
