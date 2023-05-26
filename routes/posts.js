const router = require('express').Router();
const { isAuth, isAdmin } = require('../config/passport');
const comments = require('./comments');
const {
  getAllPosts,
  getSinglePost,
  submitNewPost,
  deleteSinglePost,
} = require('../controllers/postsController');

router.use('/:postId/comments', comments);

router.get('/', isAuth, getAllPosts);

router.get('/:postId', isAuth, getSinglePost);

router.post('/', isAuth, isAdmin, submitNewPost);

router.delete('/:postId', isAuth, isAdmin, deleteSinglePost);

module.exports = router;
