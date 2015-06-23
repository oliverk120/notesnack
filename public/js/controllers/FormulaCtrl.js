
angular.module('FormulaCtrl', []).controller('FormulaController', function($scope, $routeParams, Formulas) {
  var formulaId = $routeParams.formulaId;
  if(formulaId){
    Formulas.getOne(formulaId)
        .success(function(data) {
            $scope.formula = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
  }
  

    $scope.create = function(){
      var formula = {
            title: this.title,
            content: this.content
          };
      Formulas.create(formula)
      .success(function(data){
        console.log('success');
        console.log(data);
        $scope.title = '', $scope.content = '';
      })
      .error(function(data){
        console.log('Error: ' + data);
      });
    }

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
