app.controller('customerController', ['$scope', 'customerFactory', '$location', '$cookies', '$routeParams', function($scope, customerFactory, $location, $cookies, $routeParams){

	$scope.id = $routeParams.id;
	$scope.success;
	$scope.customers;
	$scope.customer;

	$scope.allCustomers = function(){
		customerFactory.all(function(results){
			$scope.customers = results;
			for (var customer in $scope.customers){
				if($scope.customers[customer]._id == $scope.id){
					$scope.customer = $scope.customers[customer];
				}
			}
		});
	};
	$scope.allCustomers();

	$scope.addCustomer = function(){
		customerFactory.create($scope.newCustomer, function(results){
			$scope.success = (results.name + " was successfully added.");
			$scope.newCustomer = {};
		});
		$scope.allCustomers();
	};

	$scope.updateCustomer = function(){
		customerFactory.edit($scope.customer, $scope.id, function(results){
			$location.url('/customer_manage');
		});
	};

	$scope.deleteCustomer = function(){
		customerFactory.delete($routeParams, function(results){
			$location.url('/customer_manage');
		});
	};
}]);
