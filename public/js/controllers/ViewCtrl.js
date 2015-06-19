// public/js/controllers/MainCtrl.js
angular.module('ViewCtrl', []).controller('ViewController', function($scope, $http, $routeParams) {
  $http.get('/api/formula/'+$routeParams.formulaId)
        .success(function(data) {
            $scope.formula = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
});
