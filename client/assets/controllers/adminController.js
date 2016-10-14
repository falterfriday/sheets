app.controller('adminController', ['$scope', 'adminFactory', '$location', '$cookies', function($scope, adminFactory, $location, $cookies){
	$scope.update;
	$scope.admins;

	$scope.getAdmins = function(){
		adminFactory.allAdmins(function(results){
			$scope.admins = results;
			console
		});
	};
	$scope.getAdmins()

	$scope.addAdmin = function(){
		console.log($scope.newAdmin)
		adminFactory.create($scope.newAdmin, function(results){
			$location.url('/update_user');
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
					}else{
						$cookies.putObject("user",results)
						console.log(results)
						console.log($cookies)
						$location.url('/')
					}
				})
			}else{
				console.log(results)
				$cookies.putObject("user",results)
				console.log( $cookies.getObject('user') )
				console.log("ytytytytytytytytytytytytytytytyt")
				$location.url('/update_user')
			}
		})
	}
	$scope.logOut = function(){
		$cookies.remove("user")
		$location.url('/welcome')
		console.log($cookies)
	}
}])
