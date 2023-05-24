const router = require('express').Router();

router.get('/', (req, res) => {
  return res.status(200).json({
    msg: 'returning all posts...',
  });
});

router.get('/:id', (req, res) => {
  return res.status(200).json({
    msg: `returning post ${req.params.id}...`,
  });
});

router.post('/', (req, res) => {
  return res.status(200).json({
    msg: 'submitting new post...',
  });
});

router.delete('/:id', (req, res) => {
  return res.status(200).json({
    msg: `deleting post ${req.params.id}...`,
  });
});

module.exports = router;
