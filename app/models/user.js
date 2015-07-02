// app/models/user.js
// grab the mongoose module
var mongoose = require('mongoose');

Schema = mongoose.Schema;

/**
 * User Schema
 */
var UserSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  updated: {
    type: Array
  }
});

/**
 * Validations
 */
UserSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

UserSchema.path('content').validate(function(content) {
  return !!content;
}, 'Content cannot be blank');


UserSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', UserSchema);