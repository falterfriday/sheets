app.controller('adminController', ['$scope', 'adminFactory', '$location', '$cookies', function($scope, adminFactory, $location, $cookies){
	$scope.update;
	$scope.master_status = $cookies.getObject('master');
	$scope.admin_status = $cookies.getObject('admin');
	console.log($scope.admin_status)
	console.log($scope.master_status)

	$scope.getAdmins = function(){
		adminFactory.allAdmins(function(results){
			$scope.admins = results;
		});
	};
	$scope.getAdmins()

	$scope.addAdmin = function(){
		adminFactory.create($scope.newAdmin, function(results){
			$location.url('/welcome');
		});
	};
	$scope.deleteAdmin = function(id){
		// need to create a check to make sure a master is logged in
		console.log(id)
		adminFactory.delete(id, function(results){
			$scope.update = "User was deleted.  You must have at least one user to access Sheets!"
		});
	};
	$scope.getAdmins()

	$scope.verify = function(){
		adminFactory.verifyMaster($scope.login, function(results){
			if(results.message){
				adminFactory.verifyAdmin($scope.login, function(results){
					if(results == null){
						 $scope.update = "Nope"
					}else{
						$cookies.putObject("admin",results)
						console.log($cookies.getObject('admin'))
						$location.url('/stations')
					}
				})
			}else{
				console.log(results)
				$cookies.putObject("master",results)
				console.log( $cookies.getObject('master') )
				$location.url('/update_user')
			}
		})
	}
	$scope.logOut = function(){
		$cookies.remove("admin")
		$cookies.remove("master")
		$location.url('/')
		console.log($cookies)
	}
}])