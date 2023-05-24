const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Find out if this works instead:
// const Schema = require('mongoose').Schema;

const PostSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
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
  isPublished: {
    type: Boolean,
    required: true,
  },
});

PostSchema.virtual('url').get(function () {
  return `posts/${this._id}`;
});

module.exports = mongoose.model('Post', PostSchema);
