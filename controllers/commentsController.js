const getAllComments = (req, res) => {
  return res.status(200).json({
    msg: `returning all comments from post ${req.params.postId}...`,
  });
};

const getSingleComment = (req, res) => {
  return res.status(200).json({
    msg: `returning comment ${req.params.commentId} from post ${req.params.postId}...`,
  });
};

const submitNewComment = (req, res) => {
  return res.status(200).json({
    msg: `submitting new comment for post ${req.params.postId}...`,
  });
};

const deleteSingleComment = (req, res) => {
  return res.status(200).json({
    msg: `deleting comment ${req.params.commentId} from post ${req.params.postId}...`,
  });
};

module.exports = {
  getAllComments,
  getSingleComment,
  submitNewComment,
  deleteSingleComment,
};
