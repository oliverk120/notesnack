// js/services/formulas.js
angular.module('formulaService', [])

    // super simple service
    // each function returns a promise object 
    .factory('Formulas', ['$http', function($http) {
        return {
            get : function() {
                return $http.get('/api/formulas');
            },
            getOne : function(id) {
                return $http.get('/api/formula/'+ id);
            },
            create : function(formulaData) {
                return $http.post('/api/formulas', formulaData);
            },
            update : function(id, formulaData) {
                return $http.put('/api/formula/' + id, formulaData);
            },
            delete : function(id) {
                return $http.delete('/api/formula/' + id);
            }
        }
    }])
    .factory('Notesheets', ['$http', function($http) {
        return {
            get : function() {
                return $http.get('/api/notesheets');
            },
            getOne : function(id) {
                return $http.get('/api/notesheet/'+ id);
            },
            create : function(notesheetData) {
                return $http.post('/api/notesheets', notesheetData);
            },
            update : function(id, notesheetData) {
                return $http.put('/api/notesheet/' + id, notesheetData);
            },
            delete : function(id) {
                return $http.delete('/api/notesheet/' + id);
            }
        }
    }]);

