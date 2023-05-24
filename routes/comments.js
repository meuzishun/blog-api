const router = require('express').Router();

router.get('/', (req, res) => {
  return res.status(200).json({
    msg: 'returning all comments...',
  });
});

router.get('/:id', (req, res) => {
  return res.status(200).json({
    msg: `returning comment ${req.params.id}...`,
  });
});

router.post('/', (req, res) => {
  return res.status(200).json({
    msg: 'submitting new comment...',
  });
});

router.delete('/:id', (req, res) => {
  return res.status(200).json({
    msg: `deleting comment ${req.params.id}...`,
  });
});

module.exports = router;
