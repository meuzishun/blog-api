const router = require('express').Router({ mergeParams: true });
const { isAuth, isAdmin } = require('../config/passport');
const { contentValidator } = require('../lib/inputValidators');
const {
  getAllComments,
  getSingleComment,
  submitNewComment,
  deleteSingleComment,
} = require('../controllers/commentsController');

router.get('/', isAuth, getAllComments);

router.get('/:commentId', isAuth, getSingleComment);

router.post('/', contentValidator, isAuth, submitNewComment);

router.delete('/:commentId', isAuth, isAdmin, deleteSingleComment);

module.exports = router;
