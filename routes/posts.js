const router = require('express').Router();
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

router.post('/', submitNewPost);

router.delete('/:postId', deleteSinglePost);

module.exports = router;
