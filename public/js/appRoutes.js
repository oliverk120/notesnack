// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($stateProvider, $locationProvider) {

    $stateProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })
        .when('/formula/:formulaId', {
            templateUrl: 'views/view.html',
        })
        .when('/formulas/create', {
            templateUrl: 'views/createFormula.html',
        });

    $locationProvider.html5Mode(true);

}]);
