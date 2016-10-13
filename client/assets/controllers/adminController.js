app.controller('adminController', ['$scope', 'adminFactory', '$location', '$cookies', function($scope, adminFactory, $location, $cookies){
	$scope.update;

	$scope.getAdmins = function(){
		adminFactory.allAdmins(function(results){
			$scope.admins = results;
		});
	};
	$scope.addAdmin = function(){
		adminFactory.create($scope.newAdmin, function(results){
			$location.url('/welcome');
		});
	};
	$scope.deleteAdmin = function(){
		adminFactory.delete($routeParams, function(results){
			$scope.update = "User was deleted.  You must create a new user to access Sheets!"
		});
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