'use strict';

angular.module('UserCtrl', [])
.controller('UserController', ['$scope','$routeParams', '$location', 'User',
  function($scope,$routeParams, $location, User) {

    var userId = $routeParams.userId;

    $scope.findOne = function(){
      if(userId){
        User.getOne(userId)
        .success(function(data) {
          $scope.user = data;
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
      }
    }

    $scope.userList = function(){
      User.get()
      .success(function(data) {
        $scope.users = data;
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
    }

    $scope.create = function(title, content){
      var user = {
        title: title,
        content: content
      };
      User.create(user)
      .success(function(data){
        console.log('success');
        $location.path('user/'+data._id);
      })
      .error(function(data){
        console.log('Error: ' + data);
      });
    }

    $scope.delete = function(id){
      if(id){
        User.delete(id);  
      }else if($routeParams.userId){
        User.delete($routeParams.userId);
      } else {
        console.log('nothing to delete');
      }
      $scope.user = {};
      $scope.sheetData = {};
      $scope.sheetDataIds = {};
      $location.path('users');
    }

    $scope.update = function(title, content){
      var user = $scope.user;
      user.content = JSON.stringify(user.content);
      if(!user.updated) {
        user.updated = [];
      }
      user.updated.push(new Date().getTime());
      var id = user._id
      User.update(id, user).success(function(data){
        $location.path('user/'+data._id);
      }).error(function(data){
        console.log('Error: '+data);
      });
    }
  }
  ])
.controller('LoginController', ['$rootScope', 'User',
  function($rootScope, User) {
    var vm = this;

      // This object will be filled by the form
      vm.user = {};
      
      vm.input = {
        type: 'password',
        placeholder: 'Password',
        confirmPlaceholder: 'Repeat Password',
        iconClass: '',
        tooltipText: 'Show password'
      };

      vm.togglePasswordVisible = function() {
        vm.input.type = vm.input.type === 'text' ? 'password' : 'text';
        vm.input.placeholder = vm.input.placeholder === 'Password' ? 'Visible Password' : 'Password';
        vm.input.iconClass = vm.input.iconClass === 'icon_hide_password' ? '' : 'icon_hide_password';
        vm.input.tooltipText = vm.input.tooltipText === 'Show password' ? 'Hide password' : 'Show password';
      };

      $rootScope.$on('loginfailed', function(){
        vm.loginError = User.loginError;
      });

      // Register the login() function
      vm.login = function() {
        User.login(this.user);
      };
    }
    ])
.controller('RegisterCtrl', ['$rootScope', 'User',
  function($rootScope, User) {
    var vm = this;

    vm.user = {};

    vm.registerForm = User.registerForm = true;
    console.log(User);
    vm.input = {
      type: 'password',
      placeholder: 'Password',
      placeholderConfirmPass: 'Repeat Password',
      iconClassConfirmPass: '',
      tooltipText: 'Show password',
      tooltipTextConfirmPass: 'Show password'
    };

    vm.togglePasswordVisible = function() {
      vm.input.type = vm.input.type === 'text' ? 'password' : 'text';
      vm.input.placeholder = vm.input.placeholder === 'Password' ? 'Visible Password' : 'Password';
      vm.input.iconClass = vm.input.iconClass === 'icon_hide_password' ? '' : 'icon_hide_password';
      vm.input.tooltipText = vm.input.tooltipText === 'Show password' ? 'Hide password' : 'Show password';
    };
    vm.togglePasswordConfirmVisible = function() {
      vm.input.type = vm.input.type === 'text' ? 'password' : 'text';
      vm.input.placeholderConfirmPass = vm.input.placeholderConfirmPass === 'Repeat Password' ? 'Visible Password' : 'Repeat Password';
      vm.input.iconClassConfirmPass = vm.input.iconClassConfirmPass === 'icon_hide_password' ? '' : 'icon_hide_password';
      vm.input.tooltipTextConfirmPass = vm.input.tooltipTextConfirmPass === 'Show password' ? 'Hide password' : 'Show password';
    };

      // Register the register() function
      vm.register = function() {
        User.register(this.user);
      };

      $rootScope.$on('registerfailed', function(){
        vm.registerError = User.registerError;
      });
    }
    ])
.controller('ForgotPasswordCtrl', ['User', '$rootScope',
  function(User, $rootScope) {
    var vm = this;
    vm.user = {};      
    vm.registerForm = User.registerForm = false;
    vm.forgotpassword = function() {
      User.forgotpassword(this.user);
    };
    $rootScope.$on('forgotmailsent', function(event, args){
      vm.response = args;
    });
  }
  ])
.controller('ResetPasswordCtrl', ['User',
  function(User) {
    var vm = this;
    vm.user = {};      
    vm.registerForm = User.registerForm = false;
    vm.resetpassword = function() {
      User.resetpassword(this.user);
    };
  }
  ]);