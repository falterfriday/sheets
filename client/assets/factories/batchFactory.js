app.factory('batchFactory', ['$http', function($http){

	function batchFactory(){
		this.create = function(batch, callback){
			$http.post('/add_batch', batch).then(function(results){
				callback(results.data);
			});
		}
		this.editStatus = function(batch, callback){
			$http.post('/update_status', batch).then(function(results){
				callback(results.data);
			});
		}
		this.allCustomers = function(callback){
			$http.get('/get_customers').then(function(results){
				callback(results.data);
			});
		}
		this.allItems = function(callback){
			$http.get('/get_items').then(function(results){
				callback(results.data);
			});
		}
		this.allBatches = function(callback){
			$http.get('/get_batches').then(function(results){
				callback(results.data);
			});
		}
	}
	return new batchFactory();	
}]);