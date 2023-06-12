const router = require('express').Router();
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

router.get('/:postId', getSinglePost);

router.post('/', titleValidator, contentValidator, submitNewPost);

router.delete('/:postId', deleteSinglePost);

module.exports = router;
