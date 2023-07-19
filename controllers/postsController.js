const asyncHandler = require('express-async-handler');
const Post = require('../models/post');
const passport = require('passport');

// @desc    Read all posts
// @route   GET /posts
// @access  Public
const getAllPosts = asyncHandler((req, res, next) => {
  passport.authenticate('jwt', { session: false }, async (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user || !user.isAdmin) {
      const posts = await Post.find({ isPublished: true }).populate('author');
      return res.status(200).json({ posts });
    }

    if (user.isAdmin) {
      const posts = await Post.find().populate('author');
      return res.status(200).json({ posts });
    }
  })(req, res, next);
});

// @desc    Read a single post
// @route   GET /posts/:postId
// @access  Public
const getSinglePost = asyncHandler(async (req, res) => {
  const post = await Post.findOne({ _id: req.params.postId }).populate(
    'author'
  );

  return res.status(200).json({ post });
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
    isPublished: req.body.isPublished,
  });

  return res.status(201).json({ post });
});

// @desc    Update a single post
// @route   PUT /posts/:postId
// @access  Private
const updateSinglePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (!post) {
    res.status(400);
    throw new Error('Post not found');
  }

  const updatedPost = await Post.findByIdAndUpdate(
    req.params.postId,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedPost);
});

// @desc    Delete a single post
// @route   DELETE /posts/:postId
// @access  Private
const deleteSinglePost = asyncHandler(async (req, res) => {
  await Post.deleteOne({ _id: req.params.postId });

  return res.status(200).json({
    msg: `post ${req.params.postId} deleted`,
  });
});

module.exports = {
  getAllPosts,
  getSinglePost,
  submitNewPost,
  updateSinglePost,
  deleteSinglePost,
};
