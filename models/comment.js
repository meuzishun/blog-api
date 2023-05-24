const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Find out if this works instead:
// const Schema = require('mongoose').Schema;

const CommentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

CommentSchema.virtual('url').get(function () {
  return `comments/${this._id}`;
});

module.exports = mongoose.model('Comment', CommentSchema);
