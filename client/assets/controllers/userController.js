app.controller('userController', ['$scope', '$rootScope', 'adminFactory' ,'batchFactory', '$location', '$cookies', '$routeParams','$mdDialog', function($scope, $rootScope, adminFactory, batchFactory, $location, $cookies, $routeParams, $mdDialog){

  $scope.admin = $cookies.getObject("user");

  $scope.current_user = {};

  $scope.getUserStatus = function(){
		adminFactory.getUserStatus(function(user){
			$rootScope.current_user = user;
			console.log("current_user = ", $scope.current_user);
		});
	}
  $scope.getUserStatus();

  $scope.showPrompt = function(ev) {
  var confirm = $mdDialog.prompt()
    .title('Hello!')
    .textContent('Please Enter Your Name')
    .placeholder('')
    .ariaLabel('Name input')
    .initialValue('')
    .targetEvent(ev)
    .ok('Submit')
    .cancel('Cancel');

  $mdDialog.show(confirm).then(function(result) {
      if (result === undefined){
          $scope.getName();
      } else {
          console.log("results = ", result);
          $scope.username = result;
          $cookies.putObject('user',{username:result});
          console.log($cookies.getObject('user'));
      }
  },
      function() {
          $scope.getName();
      });
  };
  $scope.getName = function(){
      if ($cookies.getObject('user') === "" || !$cookies.getObject('user')){
          $scope.showPrompt();
      } else {
          $scope.username = $cookies.getObject('user').username;
          console.log("Name = ", $scope.username);
          console.log("cookies = ", $cookies.getObject('user'));
          $scope.getUserStatus();
      }
  };
  $scope.getName();

  $scope.removeName = function(){
      console.log("changing username");
      $cookies.remove('user');
      $scope.getName();
  };
  adminFactory.getUserStatus(function(user){
      $rootScope.current_user = user;
  });
}]);
