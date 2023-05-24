const router = require('express').Router({ mergeParams: true });
const {
  getAllComments,
  getSingleComment,
  submitNewComment,
  deleteSingleComment,
} = require('../controllers/commentsController');

router.get('/', getAllComments);

router.get('/:commentId', getSingleComment);

router.post('/', submitNewComment);

router.delete('/:commentId', deleteSingleComment);

module.exports = router;
