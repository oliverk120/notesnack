  // public/js/controllers/MainCtrl.js
  var app = angular.module('MainCtrl', []);
  app.controller('MainController', ['$scope','$routeParams', 'Formulas', 'Notesheets', function($scope, $routeParams, Formulas, Notesheets) {
    $scope.sheetData = [];
    $scope.sheetDataIds = [];
    
    $scope.loadFormulas = function(){
      Formulas.get()
      .success(function(data) {
        $scope.formulas = data;
        $scope.filteredFormulas = $scope.formulas.slice(0, $scope.numPerPage);
        $scope.totalItems = $scope.formulas.length;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
    }
    
    $scope.loadNotesheet = function(){
      var notesheetId = $routeParams.notesheetId;
      if(notesheetId){
        Notesheets.getOne(notesheetId)
        .success(function(data) {
          $scope.notesheet = data;
          $scope.notesheet.content = JSON.parse(data.content);
          $scope.sheetData = $scope.notesheet.content;
          for(i = 0; i < $scope.sheetData.length; i++){
            $scope.sheetDataIds.push($scope.sheetData[i]._id);
          }
          console.log($scope.notesheet);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
      } else {
        $scope.notesheet = {title:'New Notesheet'};
        $scope.sheetData = [];
        $scope.sheetDataIds = [];
      }
    }

    $scope.appendItem = function(object) {
      //to disable duplicates
      console.log(object);
      if ($scope.sheetDataIds.indexOf(object._id) == -1) {
        $scope.sheetData.push(object);
        $scope.sheetDataIds.push(object._id);
      } else {
        alert('This formula has already been added to the note sheet');
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