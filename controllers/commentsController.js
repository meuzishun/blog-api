const Comment = require('../models/comment');

const getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId });

    return res.status(200).json({
      msg: `returning all comments from post ${req.params.postId}...`,
      comments,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleComment = async (req, res, next) => {
  try {
    const comment = await Comment.findOne({ _id: req.params.commentId });

    return res.status(200).json({
      msg: `returning comment ${req.params.commentId}...`,
      comment,
    });
  } catch (err) {
    next(err);
  }
};

const submitNewComment = async (req, res, next) => {
  try {
    const comment = new Comment({
      author: req.user._id,
      post: req.params.postId,
      content: req.body.content,
      timestamp: Date.now(),
    });

    await comment.save();

    return res.status(200).json({
      msg: `submitting new comment for post ${req.params.postId}...`,
      comment,
    });
  } catch (err) {
    next(err);
  }
};

const deleteSingleComment = async (req, res, next) => {
  try {
    await Comment.deleteOne({ _id: req.params.commentId });

    const comments = await Comment.find({ post: req.params.postId });

    return res.status(200).json({
      msg: `deleting comment ${req.params.commentId} from post ${req.params.postId}...`,
      comments,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllComments,
  getSingleComment,
  submitNewComment,
  deleteSingleComment,
};
