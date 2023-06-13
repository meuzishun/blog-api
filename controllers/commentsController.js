const asyncHandler = require('express-async-handler');
const Comment = require('../models/comment');

// @desc    Read all comments for a post
// @route   GET /posts/:postId/comments
// @access  Private
const getAllComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId }).populate(
    'author'
  );

  return res.status(200).json({ comments });
});

// @desc    Read a single comment for a post
// @route   GET /posts/:postId/comments/:commentId
// @access  Private
const getSingleComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findOne({ _id: req.params.commentId }).populate(
    'author'
  );

  return res.status(200).json({ comment });
});

// @desc    Create a new comment for a post
// @route   POST /posts/:postId/comments
// @access  Private
const submitNewComment = asyncHandler(async (req, res) => {
  const comment = await Comment.create({
    author: req.user._id,
    post: req.params.postId,
    content: req.body.content,
    timestamp: Date.now(),
  });

  return res.status(201).json({ comment });
});

// @desc    Delete a single comment for a post
// @route   DELETE /posts/:postId/comments/:commentId
// @access  Private
const deleteSingleComment = asyncHandler(async (req, res) => {
  await Comment.deleteOne({ _id: req.params.commentId });

  return res
    .status(200)
    .json({ msg: `comment ${req.params.commentId} deleted` });
});

module.exports = {
  getAllComments,
  getSingleComment,
  submitNewComment,
  deleteSingleComment,
};
