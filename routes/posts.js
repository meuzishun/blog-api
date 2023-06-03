const router = require('express').Router();
const { isAuth, isAdmin } = require('../config/passport');
const { titleValidator, contentValidator } = require('../lib/inputValidators');
const comments = require('./comments');
const {
  getAllPosts,
  getSinglePost,
  submitNewPost,
  deleteSinglePost,
} = require('../controllers/postsController');

router.use('/:postId/comments', comments);

router.get('/', getAllPosts);

router.get('/:postId', isAuth, getSinglePost);

router.post(
  '/',
  isAuth,
  isAdmin,
  titleValidator,
  contentValidator,
  submitNewPost
);

router.delete('/:postId', isAuth, isAdmin, deleteSinglePost);

module.exports = router;
