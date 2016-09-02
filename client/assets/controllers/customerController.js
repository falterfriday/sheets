app.controller('customerController', ['$scope', 'customerFactory', '$location', '$cookies', '$routeParams', function($scope, customerFactory, $location, $cookies, $routeParams){

$scope.id = $routeParams.id;
$scope.success;
$scope.customers;
$scope.customer;

$scope.allCustomers = function(){
	customerFactory.all(function(results){
		$scope.customers = results
		console.log(results)
		for (var customer in $scope.customers){
			console.log($scope.customers[customer]._id)
			console.log($scope.id)
			if($scope.customers[customer]._id == $scope.id){
				$scope.customer = $scope.customers[customer]
				console.log($scope.customer)
			}
		}
	})
}
$scope.allCustomers()


$scope.addCustomer = function(){
	customerFactory.create($scope.newCustomer, function(results){
		$scope.success = (results.name + " was successfully added.")
		$scope.newCustomer = {};	
	})
	$scope.allCustomers()
}

$scope.updateCustomer = function(){
	customerFactory.edit($scope.customer, $scope.id, function(results){
		$location.url('/customer_manage')
	})
}

$scope.deleteCustomer = function(){
	customerFactory.delete($routeParams, function(results){
		console.log(results.err)
		$location.url('/customer_manage')
	})

}
}])