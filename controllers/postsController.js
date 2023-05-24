const getAllPosts = (req, res) => {
  return res.status(200).json({
    msg: 'returning all posts...',
  });
};

const getSinglePost = (req, res) => {
  return res.status(200).json({
    msg: `returning post ${req.params.postId}...`,
  });
};

const submitNewPost = (req, res) => {
  return res.status(200).json({
    msg: 'submitting new post...',
  });
};

const deleteSinglePost = (req, res) => {
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
