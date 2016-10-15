app.controller('adminController', ['$scope', '$rootScope', 'adminFactory', '$location', '$cookies', function($scope, $rootScope, adminFactory, $location, $cookies){
	$scope.update;
	$scope.admins;

	$scope.current_user = {};

	$scope.getAdmins = function(){
		adminFactory.allAdmins(function(results){
			$scope.admins = results;
			console
		});
	};
	$scope.getAdmins()

	$scope.getUserStatus = function(){
		adminFactory.getUserStatus(function(user){
			$scope.current_user = user;
			$scope.$emit($scope.current_user)
			console.log("current_user = ", $scope.current_user);
		});
	}
	// getUserStatus();

	$scope.addAdmin = function(){
		console.log($scope.newAdmin)
		adminFactory.create($scope.newAdmin, function(results){
			$scope.newAdmin = {}
			$scope.getAdmins();
		});
	};
	$scope.deleteUser = function(id){
		// need to create a check to make sure a master is logged in
		adminFactory.delete(id, function(results){
			$scope.update = "User was deleted.  You must create a new user to access Sheets!"
		});
		$scope.getAdmins()
	};

	$scope.verify = function(){
		adminFactory.verifyMaster($scope.login, function(results){
			if(results.message){
				adminFactory.verifyAdmin($scope.login, function(results){
					if(results == null){
						 $scope.update = "Nope"
						 $scope.getUserStatus();
					}else{
						$cookies.putObject("user",results)
						console.log("cookied user = ", $cookies.getObject('user') )
						$scope.getUserStatus();
						$location.url('/stations')
					}
				})
			}else{
				console.log("master aC results = ", results)
				$cookies.putObject("user",results)
				console.log("cookied user = ", $cookies.getObject('user') )
				$scope.getUserStatus();
				$location.url('/update_user')
			}
		})
	}
	$scope.logOut = function(){
		$cookies.remove("user")
		$rootScope.current_user = {};
		$location.url('/welcome')
		console.log($cookies)
	}
}])
