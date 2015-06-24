  // public/js/controllers/MainCtrl.js
  var app = angular.module('MainCtrl', []);
  app.controller('MainController', ['$scope','$routeParams', 'Formulas', 'Notesheets', function($scope, $routeParams, Formulas, Notesheets) {
    $scope.editable = true;
    $scope.sheetData = [];
    $scope.data = [];
    $scope.sheetDataIds = [];

    Formulas.get()
    .success(function(data) {
      $scope.data = data;
      $scope.filteredData = data.slice(0, $scope.numPerPage);
      $scope.totalItems = data.length;
      //$scope.sheetData = data.slice(1,4);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

    $scope.loadNotesheet = function(){
      var notesheetId = $routeParams.notesheetId;
      if(notesheetId){
        Notesheets.getOne(notesheetId)
        .success(function(data) {
          $scope.notesheet = {
            title: data.title,
            content: JSON.parse(data.content)
          };
          $scope.sheetData = $scope.notesheet.content;
          console.log($scope.sheetData);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
      } else {
        $scope.notesheet = {title:'New Notesheet'};
        $scope.sheetData = [];
      }
    }

    $scope.appendItem = function(object) {
      //to disable duplicates
      if ($scope.sheetData.indexOf(object) == -1) {
        $scope.sheetData.push(object);
        $scope.sheetDataIds.push(object._id);
      } else {
        console.log('already added');
      }
    }

    $scope.isInNoteSheet = function(item) {
      if ($scope.sheetData.indexOf(item) > -1) {
        return 'disabledLink';
      }
    } 

  }]).directive('workspace', ['$rootScope', function($rootScope) {
    return {
      constrain: 'A',
      controller: function($scope, $element) {
        $scope.packery = new Packery($element[0], {
          itemSelector: '.module',
        });
        $('#arrange').prop("disabled", false).click(function(){
          $scope.packery.layout();
        });
        
      },
      link: function($scope, element, attrs) {
        element.ready(function() {
          $scope.packery.layout();
        });

      }
    };
  }]).directive('nsformula', [function() {
    return {
      require: '^workspace',
      template: '<div class="module" ng-class="{moduleBorder:editable}" id="{{item.id}}"><span class="close" ng-class="{hidden:!editable}" ng-click="remove(item)">&times;</span><div class="title"><a href="formula/{{item._id}}">{{item.title}}</a></div><div class="content"> {{item.content}}</div></div>',
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
      template: '<a href="" ng-click="appendItem(item)" ng-class="isInNoteSheet(item)"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> &nbsp{{item.title}}</a>',
    }
  }]);