const Post = require('../models/post');

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate('author');

    return res.status(200).json({
      msg: 'returning all posts...',
      posts,
    });
  } catch (err) {
    next(err);
  }
};

const getSinglePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.postId }).populate(
      'author'
    );

    return res.status(200).json({
      msg: `returning post ${req.params.postId}...`,
      post,
    });
  } catch (err) {
    next(err);
  }
};

const submitNewPost = async (req, res, next) => {
  try {
    const post = new Post({
      author: req.user._id,
      title: req.body.title,
      content: req.body.content,
      timestamp: Date.now(),
      isPublished: true,
    });

    await post.save();

    return res.status(200).json({
      msg: 'submitting new post...',
      post,
    });
  } catch (err) {
    next(err);
  }
};

const deleteSinglePost = async (req, res, next) => {
  try {
    await Post.deleteOne({ _id: req.params.postId });

    return res.status(200).json({
      msg: `deleting post ${req.params.postId}...`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllPosts,
  getSinglePost,
  submitNewPost,
  deleteSinglePost,
};
