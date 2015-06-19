// js/services/formulas.js
angular.module('formulaService', [])

    // super simple service
    // each function returns a promise object 
    .factory('Formulas', function($http) {
        return {
            get : function() {
                return $http.get('/api/formulas');
            },
            create : function(todoData) {
                return $http.post('/api/formulas', formulaData);
            },
            delete : function(id) {
                return $http.delete('/api/formula/' + id);
            }
        }
    });

