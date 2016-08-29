app.controller('batchController', ['$scope', 'batchFactory', '$location', '$cookies', '$routeParams', function($scope, batchFactory, $location, $cookies, $routeParams){
	$scope.customers;
	$scope.items;
	$scope.batches;
	$scope.completed = [];
	$scope.processing = [];
	$scope.queue = [];

	$scope.getBatches = function(){
		batchFactory.allBatches(function(results){
			$scope.batches = results;
		});
	}
	$scope.getCustomers = function(){
		batchFactory.allCustomers(function(results){
			$scope.customers = results;
		});
	}
	$scope.getItems = function(){
		batchFactory.allItems(function(results){
			$scope.items = results;
		})
	}
	$scope.getBatches();
	$scope.getCustomers();
	$scope.getItems();

	$scope.selectPerItem = function(){
		var arr = $scope.items;
		for (var i=0; i<arr.length; i++){
			if ($scope.queuedPerItem.index == i){
				$scope.queuedPerItem.name = arr[i].name;
				$scope.queuedPerItem.charge = arr[i].charge;
				$scope.queuedPerItem.price = arr[i].price;
			}
		}
		$scope.queuedPerItem.subtotal = parseInt($scope.queuedPerItem.price)*parseInt($scope.queuedPerItem.quantity);
		$scope.queue.push($scope.queuedPerItem);
		$scope.queuedPerItem = {};
	}
	$scope.selectPerPound = function(){
		var arr = $scope.items;
		for (var i=0; i<arr.length; i++){
			if ($scope.queuedPerPound.index == i){
				$scope.queuedPerPound.name = arr[i].name;
				$scope.queuedPerPound.charge = arr[i].charge;
				$scope.queuedPerPound.price = arr[i].price;
			}
		}
		$scope.queuedPerPound.subtotal = parseInt($scope.queuedPerPound.price)*parseInt($scope.queuedPerPound.quantity);
		$scope.queue.push($scope.queuedPerPound);
		$scope.queuedPerPound = {};
	}
	$scope.addBatch = function(){
		$scope.newBatch.order = $scope.queue;
		$scope.newBatch.status = "Received";
		batchFactory.create($scope.newBatch, function(results){
			$location.url('/dashboard');
		});
	}
	$scope.updateStatus = function(batch){
		console.log(batch)
		batchFactory.editStatus(batch, function(results){
			$scope.getBatches()
		})
	}
}]);