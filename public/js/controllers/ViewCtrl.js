// public/js/controllers/MainCtrl.js
angular.module('ViewCtrl', []).controller('ViewController', function($scope, $routeParams, Formulas) {
  var formulaId = $routeParams.formulaId;
  Formulas.getOne(formulaId)
        .success(function(data) {
            $scope.formula = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
   $scope.delete = function(){
   		Formulas.delete(formulaId);
      $scope.formula = {};
   }
   $scope.update = function(){
    var formula = $scope.formula;
    if(!formula.updated) {
      formula.updated = [];
    }
    formula.updated.push(new Date().getTime());
    console.log(formula);
    var id = formula._id
    Formulas.update(id, formula);
   }
});
