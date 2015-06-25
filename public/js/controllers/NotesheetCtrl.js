// public/js/controllers/MainCtrl.js
angular.module('NotesheetCtrl', []).controller('NotesheetController', ['$scope', '$routeParams', '$location', 'Notesheets', function($scope, $routeParams, $location, Notesheets) {

  $scope.saveNotesheet = function(_data){
    $scope.editable = false;
    var data = JSON.stringify(_data);
    $scope.create(data);
  }

  $scope.notesheetList = function(){
    Notesheets.get()
    .success(function(data) {
      $scope.notesheets = data;
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  }

  $scope.createOrUpdate = function(title, content){
    var id = $routeParams.notesheetId;
    if(id){
       Notesheets.getOne(id)
        .success(function(data) {
          $scope.update();
        })
        .error(function(data) {
          console.log('Could not find sheet to update: ' + data);
        });
    } else {
      $scope.create(title, content);
    }
  }

  $scope.create = function(title, content){
    var notesheet = {
      title: title,
      content: content
    };
    Notesheets.create(notesheet)
    .success(function(data){
      console.log('success');
      $location.path('notesheet/'+data._id);
    })
    .error(function(data){
      console.log('Error: ' + data);
    });
  }

  $scope.delete = function(id){
    if(id){
      Notesheets.delete(id);  
    }else if($routeParams.notesheetId){
      Notesheets.delete($routeParams.notesheetId);
    } else {
      console.log('nothing to delete');
    }
    $scope.notesheet = {};
    $scope.sheetData = {};
    $scope.sheetDataIds = {};
    $location.path('notesheets');
  }

  $scope.update = function(title, content){
    var notesheet = $scope.notesheet;
    notesheet.content = JSON.stringify(notesheet.content);
    if(!notesheet.updated) {
      notesheet.updated = [];
    }
    notesheet.updated.push(new Date().getTime());
    var id = notesheet._id
    Notesheets.update(id, notesheet).success(function(data){
      $location.path('notesheet/'+data._id);
    }).error(function(data){
      console.log('Error: '+data);
    });
  }
}]);
