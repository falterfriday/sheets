app.controller('batchController', ['$scope', 'batchFactory', '$location', '$cookies', '$routeParams','$mdDialog', function($scope, batchFactory, $location, $cookies, $routeParams, $mdDialog){
	$scope.customers;
	$scope.items;
	$scope.batches;
	$scope.queued_item;
	$scope.selected = false;
	$scope.selected2 = false;
	$scope.hide_val = true;
	$scope.hide_val2 = true;
	$scope.hide_val3 = true;
	$scope.hide_val4 = false;
	$scope.hide_val5 = true;
	$scope.hide_val6 = false;
	$scope.completed = [];
	$scope.processing = [];
	$scope.queue = [];

	$scope.getBatches = function(){
		batchFactory.allBatches(function(results){
			$scope.batches = results;
		});
	};
	$scope.getCustomers = function(){
		batchFactory.allCustomers(function(results){
			$scope.customers = results;
		});
	};
	$scope.getItems = function(){
		batchFactory.allItems(function(results){
			$scope.items = results;
		});
	};
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
	};
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
	};
	$scope.addBatch = function(){
		$scope.newBatch.order = $scope.queue;
		$scope.newBatch.status = "Received";
		batchFactory.create($scope.newBatch, function(results){
			$location.url('/dashboard');
		});
	};
	$scope.updateStatus = function(batch){
		$scope.selected = false;
		$scope.queued_item = undefined;
		if($scope.hide_val2 === false){
			$scope.hide_val2 = true;
		}
		if($scope.hide_val === false){
			$scope.hide_val = true;
		}
		batchFactory.editStatus(batch, function(results){
			$scope.getBatches();
		});
	};
	// $scope.highlight = function(batch){
	// 	if($scope.queued_item == batch){
	// 		$scope.queued_item = undefined;
	// 		if(batch.status == 'Washing'){
	// 			$scope.hide_val2 = true;
	// 		}else{
	// 			$scope.hide_val = true;
	// 		}
	// 	}
	// 	if($scope.queued_item == undefined){
	// 		$scope.queued_item = batch;
	// 		if(batch.status == 'Washing'){
	// 			$scope.hide_val2 = false;
	// 		}else{
	// 			$scope.hide_val = false;
	// 		}
	// 	}
	// 	if($scope.queued_item != undefined && $scope.queued_item != batch){
	// 		$scope.queued_item = batch;
	// 		$scope.hide_val = false;
	// 	}
	// }
	$scope.highlight = function(batch){
		console.log(batch);
		if(batch.status == "Received"){
			$scope.queued_item = batch;
			$scope.hide_val = false;
			$scope.hide_val2 = true;
			$scope.hide_val3 = false;
			$scope.hide_val4 = true;
			$scope.hide_val5 = true;
			$scope.hide_val6 = false;
			$scope.queued_item = batch;
		}else{
			$scope.queued_item = batch;
			$scope.hide_val = true;
			$scope.hide_val2 = false;
			$scope.hide_val3 = true;
			$scope.hide_val4 = false;
			$scope.queued_item = batch;
			$scope.hide_val5 = false;
			$scope.hide_val6 = true;
		}
	};
	$scope.isSelected = function(batch) {
    	return $scope.queued_item === batch;
	};
	$scope.deselect = function(batch){
		if(batch.status == "Received"){
			$scope.queued_item = undefined;
			$scope.hide_val = true;
			$scope.hide_val2 = true;
			$scope.hide_val3 = true;
			$scope.hide_val4 = false;
			$scope.hide_val5 = true;
			$scope.hide_val6 = false;
		}else{
			$scope.queued_item = undefined;
			$scope.hide_val = true;
			$scope.hide_val2 = true;
			$scope.hide_val3 = true;
			$scope.hide_val4 = false;
			$scope.hide_val5 = true;
			$scope.hide_val6 = false;

		}
	};
	$scope.showPrompt = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
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
      $scope.username = result;
      $cookies.putObject('user',{username:result});
    }, function() {
      $scope.getName();
    });
  };
    $scope.getName = function(){
        if (!$scope.username || $scope.username === '' ){
                $scope.showPrompt();
        } else {
            console.log("Got name");
        }
    };
    $scope.getName();
}]);
