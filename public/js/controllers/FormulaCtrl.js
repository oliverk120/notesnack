
angular.module('FormulaCtrl', []).controller('FormulaController', ['$scope', '$location', '$routeParams', 'Formulas', function($scope, $location, $routeParams, Formulas) {
  var formulaId = $routeParams.formulaId;

  $scope.findOne = function(){
    if(formulaId){
    Formulas.getOne(formulaId)
    .success(function(data) {
      $scope.formula = data;
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  }
  }

  $scope.create = function(){
    var formula = {
      title: this.title,
      content: this.content
    };
    Formulas.create(formula)
    .success(function(data){
      $scope.title = '', 
      $scope.content = '';
      $location.path('/notesheets');
    })
    .error(function(data){
      console.log('Error: ' + data);
    });
  }

 $scope.delete = function(){
   Formulas.delete(formulaId);
   $scope.formula = {};
   $location.path('/notesheets');
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


    // pagination settings  
    $scope.currentPage = 1;
    $scope.numPerPage = 10;

    ///Pagination Functions
    $scope.pagination = function(){
      this.fun = function(){
        console.log('wurs');
      }
    }

    $scope.selectPage = function(page, evt) {
      if ( $scope.page !== page && page > 0 && page <= $scope.totalPages) {
        if (evt && evt.target) {
          evt.target.blur();
        }
      }
      $scope.setPage(page);
    };

    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
      var begin = (($scope.currentPage - 1) * $scope.numPerPage)
      , end = begin + $scope.numPerPage;
      if($scope.formulas.length > 0){
        $scope.filteredFormulas = $scope.formulas.slice(begin, end);
      }
    };

    $scope.onFocus = function(){
      //allows you to search all formulas, not just the ones on the current pagination page
      $scope.filteredData = $scope.formulas;
    }

    $scope.outFocus = function(){
      //limits the formulas shown to the current pagination page
      $scope.searchText = '';
      $scope.setPage($scope.currentPage);
    }
  }]);
