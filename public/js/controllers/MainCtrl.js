// public/js/controllers/MainCtrl.js
var app = angular.module('MainCtrl', []);
app.controller('MainController', function($scope, $http, Formulas) {
  $scope.editable = true;
  $scope.sheetData = [];
  $scope.data = [];
  // pagination settings  
  $scope.currentPage = 1;
  $scope.numPerPage = 3;

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
    if($scope.data.length > 0){
      $scope.filteredData = $scope.data.slice(begin, end);
    }
    console.log($scope.data);
  };

  $http.get('/api/Formulas')
  .success(function(data) {
    $scope.data = data;
    $scope.filteredData = data.slice(0, $scope.numPerPage);
    $scope.sheetData = data.slice(1,3);
    $scope.totalItems = data.length;
  })
  .error(function(data) {
    console.log('Error: ' + data);
  });

  $scope.formulaBarExpand = function() {

  }
  
  
  $scope.isInNoteSheet = function(item) {
    if ($scope.sheetData.indexOf(item) > -1) {
      return 'disabledLink';
    }
  }

}).directive('workspace', ['$rootScope', function($rootScope) {
  return {
    constrain: 'A',
    controller: function($scope, $element) {
      $scope.packery = new Packery($element[0], {
        itemSelector: '.module',
      });
      $('#arrange').prop("disabled", false).click(function(){
        $scope.packery.layout();
      });
      $scope.appendItem = function(object) {
        //to disable duplicates
        if ($scope.sheetData.indexOf(object) == -1) {
          $scope.sheetData.push(object);
          
          $scope.packery.layout();
        } else {
          console.log('already added');
        }
      }
    },
    link: function($scope, element, attrs) {

      element.ready(function() {
        /*
        angular.forEach($scope.packery.getItemElements(), function(item) {
          var draggable = new Draggabilly(item);
          $scope.packery.bindDraggabillyEvents(draggable);
        });
      */
      $scope.packery.layout();
    });

    }
  };
}]).directive('nsformula', [function() {

  return {
    require: '^workspace',
    template: '<div class="module" ng-class="{moduleBorder:editable}" id="{{item.id}}"><span class="close" ng-class="{hidden:!editable}" ng-click="remove(item)">&times;</span><div class="title"><a href="formula/{{item._id}}">{{item.title}}</a></div><div class="content"> {{item.content}}</div></div>',
    controller: function($scope, $element) {
      //var draggableAppend = new Draggabilly($element[0]);
      //$scope.packery.bindDraggabillyEvents(draggableAppend);
    },
    link: function($scope, element, attributes, workspace) {
      $scope.packery.appended(element[0]);
      element.ready(function() {
        jQuery.getScript("js/jqmath.js");
        $scope.packery.layout();
      });
      $scope.remove = function(item) {
        var index = $scope.sheetData.indexOf(item);
        if (index != -1) {
          $scope.packery.remove(item);
          $scope.sheetData.splice(index, 1);
          
        } else {
          console.log('already removed');
        }
      }
    }
  };
}]).directive('formulalink', [function() {
  return {
    template: '<a href="" ng-click="appendItem(item)" ng-class="  isInNoteSheet(item)"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> &nbsp{{item.title}}</a>',
    controller: function() {
      var test = 'foo';
    },
    link: function(scope, element, attr) {
    }
  }
}]);
;

