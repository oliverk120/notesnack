// app/models/notesheet.js
// grab the mongoose module
var mongoose = require('mongoose');

Schema = mongoose.Schema;

/**
 * Notesheet Schema
 */
var NotesheetSchema = new Schema({
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

NotesheetSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Notesheet', NotesheetSchema);