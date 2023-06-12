const router = require('express').Router({ mergeParams: true });
const { contentValidator } = require('../lib/inputValidators');
const {
  getAllComments,
  getSingleComment,
  submitNewComment,
  deleteSingleComment,
} = require('../controllers/commentsController');

router.get('/', getAllComments);

router.get('/:commentId', getSingleComment);

router.post('/', contentValidator, submitNewComment);

router.delete('/:commentId', deleteSingleComment);

module.exports = router;
