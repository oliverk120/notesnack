
// grab the Formula model we just created
var Formula = require('./models/formula');

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
  var formula = new Formula(req.body);
            formula.save(function(err) {
                if (err) {
                  return res.json(500, {
                    error: 'Cannot save the formula'
                });
              }
              res.json(formula);
            });
};

exports.update = function(req, res) {
  var formula = req.formula;

  formula = _.extend(formula, req.body);

  formula.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the formula'
      });
    }
    res.json(formula);

  });
};

exports.destroy = function(req, res) {
  var formula = req.formula;
  formula.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the formula'
      });
    }
    //res.json(formula);
  });

};