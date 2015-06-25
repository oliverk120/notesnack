// app/models/formula.js
// grab the mongoose module
var mongoose = require('mongoose');

Schema = mongoose.Schema;

/**
 * Formula Schema
 */
var FormulaSchema = new Schema({
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
FormulaSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

FormulaSchema.path('content').validate(function(content) {
  return !!content;
}, 'Content cannot be blank');

FormulaSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Formula', FormulaSchema);