const router = require('express').Router();
const comments = require('./comments');

router.use('/:postId/comments', comments);

router.get('/', (req, res) => {
  return res.status(200).json({
    msg: 'returning all posts...',
  });
});

router.get('/:postId', (req, res) => {
  return res.status(200).json({
    msg: `returning post ${req.params.postId}...`,
  });
});

router.post('/', (req, res) => {
  return res.status(200).json({
    msg: 'submitting new post...',
  });
});

router.delete('/:postId', (req, res) => {
  return res.status(200).json({
    msg: `deleting post ${req.params.postId}...`,
  });
});

module.exports = router;
