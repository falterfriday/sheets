// DEPRECATED DUE TO CROSSOVER WITH ADMINCONTROLLER

// app.controller('userController', ['$scope', '$rootScope', 'adminFactory' ,'batchFactory', '$location', '$cookies', '$routeParams','$mdDialog', function($scope, $rootScope, adminFactory, batchFactory, $location, $cookies, $routeParams, $mdDialog){
  //   console.log("userController hit", $cookies.getObject('user'));
  //   console.log("userController hit", $cookies.getAll());
  //
  //
  //   $scope.admin = $cookies.getObject("user");
  //   $scope.current_user = {};
  //
  //   $scope.getUserStatus = function(){
  //       adminFactory.getUserStatus(function(user){
  //           $rootScope.current_user = user;
  //       });
  //   };
  //   $scope.getUserStatus();
  //
  // $scope.showPrompt = function(ev) {
  // var confirm = $mdDialog.prompt()
  //   .title('Hello!')
  //   .textContent('Please Enter Your Name')
  //   .placeholder('')
  //   .ariaLabel('Name input')
  //   .initialValue('')
  //   .targetEvent(ev)
  //   .ok('Submit')
  //   .cancel('Cancel');
  //
  // $mdDialog.show(confirm).then(function(result) {
  //     if (result === undefined){
  //         $scope.getName();
  //     } else {
  //         $scope.username = result;
  //         $cookies.putObject('user',{username:result});
  //     }
  // },
  //     function() {
  //         $scope.getName();
  //     });
  // };
  // $scope.getName = function(){
  //     if ($cookies.getObject('user') === "" || !$cookies.getObject('user')){
  //         $scope.showPrompt();
  //     } else {
  //         $scope.username = $cookies.getObject('user').username;
  //         $scope.getUserStatus();
  //     }
  // };
  // $scope.getName();
  //
  // $scope.removeName = function(){
  //     $cookies.remove('user');
  //     $scope.getName();
  // };
  // adminFactory.getUserStatus(function(user){
  //     $rootScope.current_user = user;
  // });
// }]);
