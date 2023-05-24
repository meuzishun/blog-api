const router = require('express').Router({ mergeParams: true });

router.get('/', (req, res) => {
  return res.status(200).json({
    msg: `returning all comments from post ${req.params.postId}...`,
  });
});

router.get('/:commentId', (req, res) => {
  return res.status(200).json({
    msg: `returning comment ${req.params.commentId} from post ${req.params.postId}...`,
  });
});

router.post('/', (req, res) => {
  return res.status(200).json({
    msg: `submitting new comment for post ${req.params.postId}...`,
  });
});

router.delete('/:commentId', (req, res) => {
  return res.status(200).json({
    msg: `deleting comment ${req.params.commentId} from post ${req.params.postId}...`,
  });
});

module.exports = router;
