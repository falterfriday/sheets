app.controller('adminController', ['$scope', '$rootScope', 'adminFactory', '$location', '$cookies', function($scope, $rootScope, adminFactory, $location, $cookies){
	$scope.update;
	$scope.admins;

	$scope.current_user = {};

	$scope.getAdmins = function(){
		adminFactory.allAdmins(function(results){
			$scope.admins = results;
		});
	};
	$scope.getAdmins()

	$scope.getUserStatus = function(){
		adminFactory.getUserStatus(function(user){
			console.log("getting user status")
			console.log("///////"*50)
			$rootScope.current_user = user;
		});
	}

	$scope.addAdmin = function(){
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
		console.log("start")
		console.log("///////"*50)
		adminFactory.verifyMaster($scope.login, function(results){
			console.log(results)
			if(results.message){
				adminFactory.verifyAdmin($scope.login, function(results){
					// there is something wrong with the logic of results ==null
					if(results == null){
						console.log("nada")
						console.log(results)
						console.log("///////"*50)
						 $scope.update = "Nope"
						 $scope.getUserStatus();
					}else{
						console.log("success")
						console.log("///////"*50)
						$cookies.putObject("user",results)
						$scope.getUserStatus();
						$location.url('/stations')
					}
				})
			}else{
				$cookies.putObject("user",results)
				$scope.getUserStatus();
				$location.url('/update_user')
			}
		})
	}
	$scope.logOut = function(){
		$cookies.remove("user")
		$rootScope.current_user = {};
		$location.url('/welcome')
	}
}])
