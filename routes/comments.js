const router = require('express').Router({ mergeParams: true });
const { isAuth } = require('../config/passport');
const {
  getAllComments,
  getSingleComment,
  submitNewComment,
  deleteSingleComment,
} = require('../controllers/commentsController');

router.get('/', isAuth, getAllComments);

router.get('/:commentId', isAuth, getSingleComment);

router.post('/', isAuth, submitNewComment);

router.delete('/:commentId', deleteSingleComment);

module.exports = router;
