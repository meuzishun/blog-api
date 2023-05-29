const Post = require('../models/post');
const User = require('../models/user');
const { titleValidator, contentValidator } = require('../lib/inputValidators');

const getAllPosts = async (req, res) => {
  const posts = await Post.find({});

  return res.status(200).json({
    msg: 'returning all posts...',
    posts,
  });
};

const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findOne({ title: req.params.title });

    if (!post) {
      return res
        .status(300)
        .json({ message: 'No post exists with that title' });
    }

    return res.status(200).json({
      msg: `returning post ${req.params.title}...`,
      post,
    });
  } catch (err) {
    res.status(200).json({
      err,
    });
  }
};

const submitNewPost = [
  titleValidator,
  contentValidator,
  async (req, res) => {
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
      return res.status(300).json({ err });
    }
  },
];

const deleteSinglePost = async (req, res) => {
  try {
    await Post.deleteOne({ _id: req.params.postId });
  } catch (err) {
    res.status(500).json(err);
  }

  return res.status(200).json({
    msg: `deleting post ${req.params.postId}...`,
  });
};

module.exports = {
  getAllPosts,
  getSinglePost,
  submitNewPost,
  deleteSinglePost,
};
