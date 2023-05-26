const router = require('express').Router();
const { isAuth } = require('../config/passport');
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

router.post('/', submitNewPost);

router.delete('/:postId', deleteSinglePost);

module.exports = router;
