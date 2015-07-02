// app/models/user.js
// grab the mongoose module
var mongoose = require('mongoose');
var _   = require('lodash');

Schema = mongoose.Schema;

/**
 * Getter
 */
var escapeProperty = function(value) {
  return _.escape(value);
};

/**
 * Validations
 */
var validatePresenceOf = function(value) {
  return (value && value.length);
};

var validateUniqueEmail = function(value, callback) {
  var User = mongoose.model('User');
  User.find({
    $and: [{
      email: value
    }, {
      _id: {
        $ne: this._id
      }
    }]
  }, function(err, user) {
    callback(err || user.length === 0);
  });
};

/**
 * User Schema
 */
var UserSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    unique: true,
    required: true,
    get: escapeProperty
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/, 'not a valid email'],
    validate: [validateUniqueEmail, 'E-mail address is already in-use']
  },
  roles: {
    type: Array,
    default: ['authenticated']
  },
  hashed_password: {
    type: String,
    validate: [validatePresenceOf, 'Password cannot be blank']
  },
  updated: {
    type: Array
  }
});

UserSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).exec(cb);
};

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', UserSchema);