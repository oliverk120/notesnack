// public/js/controllers/MainCtrl.js
angular.module('ViewCtrl', []).controller('ViewController', function($scope, $http, $routeParams) {
  var formulaId = $routeParams.formulaId;
  $http.get('/api/formula/'+formulaId)
        .success(function(data) {
            $scope.formula = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
   $scope.delete = function(){
   		$http.delete('/api/formula/'+formulaId);
   }
});
