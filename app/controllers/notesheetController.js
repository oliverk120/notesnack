
// grab the Notesheet model we just created
var Notesheet = require('../models/notesheet');

exports.notesheet = function(req, res, next, id) {  
  Notesheet.load(id, function(err, notesheet) {
    if (err) return next(err);
    if (!notesheet) return next(new Error('Failed to load notesheet ' + id));
    req.notesheet = notesheet;
    next();
  });
};

exports.show = function(req, res){
  res.json(req.notesheet);
};

exports.all = function(req, res) {
  var query = {};
  Notesheet.find(query).sort('-created').exec(function(err, notesheets) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the notesheets'
      });
    }
    res.json(notesheets);
  });
};

exports.create = function(req, res) {
  
  var saveNotesheet = function(saveNotesheet){
    var notesheet = new Notesheet(saveNotesheet);
    notesheet.save(function(err) {
      if (err) {
        return res.json(500, {
          error: 'Cannot save the notesheet'
      });
    }
    console.log(notesheet);
    res.json(notesheet);
  });
  }
  if(req.body.isArray){
    for (var i = 0, len = req.body.length; i < len; i++) {
      saveNotesheet(req.body[i]);
      console.log('notesheet '+i+'/'+len+' saved successfully');
    }
  } else {
    saveNotesheet(req.body);
  }
  
};

exports.update = function(req, res) {
  function extend(a, b){
    for(var key in b)
        if(b.hasOwnProperty(key))
            a[key] = b[key];
    return a;
  }
  
  var query = Notesheet.where({_id: req.params.notesheetId});
  query.findOne(function (err, notesheet) {
  if (err) {
    console.log(err)
  }
  if (notesheet) {
    notesheet = extend(notesheet, req.body);
    notesheet.save(function(err) {
      if (err) {
        return res.json(500, {
          error: 'Cannot save the notesheet'
      });
    }
    res.json(notesheet);
  });
  }
});
};

exports.destroy = function(req, res) {
  var notesheet = req.notesheet;
  console.log('in detel');
  notesheet.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the notesheet'
      });
    }
    res.json('notesheet deleted');
  });

};