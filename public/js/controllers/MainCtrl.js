// public/js/controllers/MainCtrl.js
var app = angular.module('MainCtrl', []);
app.controller('MainController', function($scope, $http, Formulas) {
  $scope.sheetData = [];
  $http.get('/api/Formulas')
        .success(function(data) {
            $scope.data = data;
            $scope.sheetData = data.slice(1,3);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

  $scope.formulaBarExpand = function() {

  }
  $scope.editable = true;
  /*
  $scope.data = [{
    content: "Passive includes one or two decision rules, active needs constant monitoring",
    title: "What is the difference between active and passive cash management strategies?"
  }, {
    content: "Audit, compensation/remuneration, nominations",
    title: "What are the three main committees associated with Boards?"
  }, {
    content: "The weights in the calculation of WACC should be based on the firms target capital structure, that is, the proportions (based on market values) of debt, preferred stock, and equity that the firm expects to achieve over time. Book values should not be used.",
    title: "How are the weightings for WACC determined?"
  }, {
    content: "Complacency, with automatic rollover, little attention to yields. Should be benchmarked.",
    title: "What is the major problem with passive cash management strategies?"
  }, {
    content: "bond yield$ + $risk premium",
    title: "Cost of equity (bond yield basis)"
  }, {
    content: "$1/(1+(1-t)*D/E)$",
    title: "Asset beta"
  }, {
    content: "$[1+(1-t)*D/E]$",
    title: "Project beta"
  }, {
    content: "$Rf + B[E(RMKT)-RF+CRP]$",
    title: "Cost of equity with country risk premium"
  }, {
    content: "$(w_d)[k_d(1-t)]+(w_{Ps})(k_{Ps})+(W_{ce})(K_{ce})$",
    title: "What is the formula for WACC?"
  }];
  */
  
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

