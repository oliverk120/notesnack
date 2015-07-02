
// grab the User model we just created
var User = require('../models/user');

exports.user = function(req, res, next, id) {  
  User.load(id, function(err, user) {
    if (err) return next(err);
    if (!user) return next(new Error('Failed to load user ' + id));
    req.user = user;
    next();
  });
};

exports.show = function(req, res){
  res.json(req.user);
};

exports.all = function(req, res) {
  var query = {};
  User.find(query).sort('-created').exec(function(err, users) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the users'
      });
    }
    res.json(users);
  });
};

exports.create = function(req, res) {
  
  var saveUser = function(saveUser){
    var user = new User(saveUser);
    user.save(function(err) {
      if (err) {
        return res.json(500, {
          error: 'Cannot save the user'
      });
    }
    console.log(user);
    res.json(user);
  });
  }
  if(req.body.isArray){
    for (var i = 0, len = req.body.length; i < len; i++) {
      saveUser(req.body[i]);
      console.log('user '+i+'/'+len+' saved successfully');
    }
  } else {
    saveUser(req.body);
  }
  
};

exports.update = function(req, res) {
  function extend(a, b){
    for(var key in b)
        if(b.hasOwnProperty(key))
            a[key] = b[key];
    return a;
  }
  
  var query = User.where({_id: req.params.userId});
  query.findOne(function (err, user) {
  if (err) {
    console.log(err)
  }
  if (user) {
    user = extend(user, req.body);
    user.save(function(err) {
      if (err) {
        return res.json(500, {
          error: 'Cannot save the user'
      });
    }
    res.json(user);
  });
  }
});
};

exports.destroy = function(req, res) {
  var user = req.user;
  console.log('in detel');
  user.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the user'
      });
    }
    res.json('user deleted');
  });

};