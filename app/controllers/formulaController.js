
// grab the Formula model we just created
var Formula = require('../models/formula');

exports.formula = function(req, res, next, id) {  
  Formula.load(id, function(err, formula) {
    if (err) return next(err);
    if (!formula) return next(new Error('Failed to load formula ' + id));
    req.formula = formula;
    next();
  });
};

exports.show = function(req, res){
  res.json(req.formula);
};

exports.all = function(req, res) {
  var query = {};
  Formula.find(query).sort('-created').exec(function(err, formulas) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the formulas'
      });
    }
    res.json(formulas);
  });
};

exports.create = function(req, res) {
  
  var saveFormula = function(saveFormula){
    var formula = new Formula(saveFormula);
    formula.save(function(err) {
      if (err) {
        return res.json(500, {
          error: 'Cannot save the formula'
      });
    }
    console.log(formula);
    res.json(formula);
  });
  }
  if(req.body.isArray){
    for (var i = 0, len = req.body.length; i < len; i++) {
      saveFormula(req.body[i]);
      console.log('formula '+i+'/'+len+' saved successfully');
    }
  } else {
    saveFormula(req.body);
  }
  
};

exports.update = function(req, res) {
  function extend(a, b){
    for(var key in b)
        if(b.hasOwnProperty(key))
            a[key] = b[key];
    return a;
  }
  
  var query = Formula.where({_id: req.params.formulaId});
  query.findOne(function (err, formula) {
  if (err) {
    console.log(err)
  }
  if (formula) {
    formula = extend(formula, req.body);
    formula.save(function(err) {
      if (err) {
        return res.json(500, {
          error: 'Cannot save the formula'
      });
    }
    res.json(formula);
  });
  }
});
};

exports.destroy = function(req, res) {
  var formula = req.formula;
  console.log('in detel');
  formula.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the formula'
      });
    }
    //res.json(formula);
  });

};