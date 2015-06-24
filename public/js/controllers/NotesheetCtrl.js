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

  $scope.create = function(data){
    console.log(data);
    var notesheet = {
      title: $scope.notesheet.title,
      content: data
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

  $scope.update = function(){
    var notesheet = $scope.notesheet;
    if(!notesheet.updated) {
      notesheet.updated = [];
    }
    notesheet.updated.push(new Date().getTime());
    console.log(notesheet);
    var id = notesheet._id
    Notesheets.update(id, notesheet);
  }
}]);
