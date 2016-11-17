app.controller('itemController', ['$scope','$rootScope', 'itemFactory', '$location', '$cookies', '$routeParams', function($scope, $rootScope, itemFactory, $location, $cookies, $routeParams){
	$scope.id = $routeParams.id;
	$scope.items;
	$scope.item;
	$scope.id;

	function getPrice(num){
		return (num/100).toFixed(2);
	}

	function setPrice(num){
		return num*100;
	}

	$scope.allItems = function(){
		itemFactory.all(function(results){
			$scope.items = results;
			for (var item in $scope.items){
				if($scope.items[item]._id == $scope.id){
					$scope.item = $scope.items[item];
				}
			}
		});
	};
	$scope.allItems();

	$scope.addItem = function(){
		itemFactory.create($scope.newItem, function(results){
			$scope.success = (results.name + ' was created!');
			$scope.newItem = {};
		});
		$location.url('/item_manage');
	};

	$scope.updateItem = function(){
		itemFactory.edit($scope.id, $scope.item, function(results){
			$scope.update = (results.name + ' was updated!');
		});
		$location.url('/item_manage');
	};

	$scope.deleteItem = function(){
		itemFactory.delete($routeParams, function(results){
			$location.url('/item_manage');
		});
	};
}]);
