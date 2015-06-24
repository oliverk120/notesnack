// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })
        .when('/formula/:formulaId', {
            templateUrl: 'views/formula/view.html',
        })
        .when('/formula/:formulaId/edit', {
            templateUrl: 'views/formula/edit.html',
        })
        .when('/formulas/create', {
            templateUrl: 'views/formula/create.html',
        })
        .when('/notesheets', {
            templateUrl: 'views/notesheet/main.html',
        })
        .when('/notesheets/list', {
            templateUrl: 'views/notesheet/index.html',
        })
        .when('/notesheet/:notesheetId', {
            templateUrl: 'views/notesheet/main.html',
        })
        .when('/notesheet/:notesheetId/edit', {
            templateUrl: 'views/notesheet/edit.html',
        })
        .when('/notesheets/create', {
            templateUrl: 'views/notesheet/create.html',
        });

    $locationProvider.html5Mode(true);

}]);
