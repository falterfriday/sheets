app.controller('adminController', ['$scope', '$rootScope', 'adminFactory', '$location', '$cookies', '$mdDialog', function($scope, $rootScope, adminFactory, $location, $cookies, $mdDialog){
	console.log("adminController hit", $cookies.getObject('user'));
	console.log("adminController cookies", $cookies.getObject('user'));
	console.log("adminController current_user", $rootScope.current_user);
	// $scope.update;
	// $scope.admins;

	$rootScope.current_user = false;


	$scope.getAdmins = function(){
		adminFactory.allAdmins(function(results){
			$scope.admins = results;
		});
	};
	$scope.getAdmins();

	$rootScope.getUserStatus = function(){
		adminFactory.getUserStatus(function(user){
			console.log("getting user status")
			$rootScope.current_user = user;
		});
	};

	$scope.addAdmin = function(){
		adminFactory.create($scope.newAdmin, function(results){
			$scope.newAdmin = {};
			$scope.getAdmins();
		});
	};
	$scope.deleteUser = function(id){
		// need to create a check to make sure a master is logged in
		adminFactory.delete(id, function(results){
			$scope.update = "User was deleted.  You must create a new user to access Sheets!";
		});
		$scope.getAdmins();
	};

	$scope.verify = function(){
		console.log("login credentials ", $scope.login );
		adminFactory.verifyMaster($scope.login, function(results){
			// console.log(results)
			if(results.message){
				adminFactory.verifyAdmin($scope.login, function(results){
					// there is something wrong with the logic of results ==null
					if(results === null){
						 $scope.update = "Nope";
						 $rootScope.getUserStatus();
					}else{
						$cookies.putObject("user",results);
						$rootScope.getUserStatus();
						$location.url('/stations');
					}
				});
			}else{
				$cookies.putObject("user",results);
				$rootScope.getUserStatus();
				$location.url('/update_user');
			}
		});
	};
	$scope.logOut = function(){
		$cookies.remove("user");
		$rootScope.current_user = false;
		$location.url('/welcome');
	};
/////////////////migrated userController////////////////////////////
	$scope.admin = $cookies.getObject("user");

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
		  $scope.username = result;
		  $cookies.putObject('user',{username:result});
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
		  $rootScope.getUserStatus();
	  }
	};
	$scope.getName();

	$scope.removeName = function(){
	  $cookies.remove('user');
	  $scope.getName();
	};
}]);
