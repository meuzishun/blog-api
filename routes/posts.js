const router = require('express').Router();
const { titleValidator, contentValidator } = require('../lib/inputValidators');
const { isAuth, isAdmin } = require('../config/passport');
const comments = require('./comments');
const {
  getAllPosts,
  getSinglePost,
  submitNewPost,
  deleteSinglePost,
} = require('../controllers/postsController');

router.use('/:postId/comments', comments);

router.get('/', getAllPosts);

router.get('/:postId', getSinglePost);

router.post('/', isAuth, titleValidator, contentValidator, submitNewPost);

router.delete('/:postId', isAuth, isAdmin, deleteSinglePost);

module.exports = router;
