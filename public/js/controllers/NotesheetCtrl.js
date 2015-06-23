// public/js/controllers/MainCtrl.js
angular.module('NotesheetCtrl', []).controller('NotesheetController', ['$scope', '$routeParams', 'Notesheets', function($scope, $routeParams, Notesheets) {
  var notesheetId = $routeParams.notesheetId;
  if(notesheetId){
    Notesheets.getOne(notesheetId)
    .success(function(data) {
      $scope.notesheet = data;
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });
  } else {
    $scope.notesheetTitle = 'Test Title';
  }

  $scope.saveNotesheet = function(data){
    $scope.editable = false;
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
    var notesheet = {
      title: $scope.notesheetTitle,
      content: data
    };
    Notesheets.create(notesheet)
    .success(function(data){
      console.log('success');
      console.log(data);
      $scope.title = '', $scope.content = '';
    })
    .error(function(data){
      console.log('Error: ' + data);
    });
  }

  $scope.delete = function(){
   Notesheets.delete(notesheetId);
   $scope.notesheet = {};
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
