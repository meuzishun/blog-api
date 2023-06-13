const asyncHandler = require('express-async-handler');
const Post = require('../models/post');

// @desc    Read all posts
// @route   GET /posts
// @access  Public
const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).populate('author');

  return res.status(201).json({
    msg: 'returning all posts...',
    posts,
  });
});

// @desc    Read a single post
// @route   GET /posts/:postId
// @access  Public
const getSinglePost = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ _id: req.params.postId }).populate(
    'author'
  );

  return res.status(200).json({
    msg: `returning post ${req.params.postId}...`,
    post,
  });
});

// @desc    Create a new post
// @route   POST /posts
// @access  Private
const submitNewPost = asyncHandler(async (req, res) => {
  const post = await Post.create({
    author: req.user._id,
    title: req.body.title,
    content: req.body.content,
    timestamp: Date.now(),
    isPublished: true,
  });

  return res.status(200).json({
    msg: 'submitting new post...',
    post,
  });
});

// @desc    Delete a single post
// @route   DELETE /posts/:postId
// @access  Private
const deleteSinglePost = asyncHandler(async (req, res) => {
  await Post.deleteOne({ _id: req.params.postId });

  return res.status(200).json({
    msg: `deleting post ${req.params.postId}...`,
  });
});

module.exports = {
  getAllPosts,
  getSinglePost,
  submitNewPost,
  deleteSinglePost,
};
