app.factory('batchFactory', ['$http', function($http){

	function batchFactory(){
		this.create = function(batch, callback){
			$http.post('/add_batch', batch).then(function(results){
				callback(results.data);
			});
		}
		this.status = function(batch, callback){
			
		}
		this.delete = function(batch, callback){
			
		}
		this.edit = function(batch, callback){
			
		}
		this.show = function(batch, callback){
			
		}
		this.allCustomers = function(callback){
			$http.get('/get_customers').then(function(results){
				callback(results.data);
			});
		}
		this.getPounds = function(callback){
			$http.get('/get_batchpounds').then(function(results){
				callback(results.data);
			});
		}
		this.getItems = function(callback){
			$http.get('/get_batchitems').then(function(results){
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
			})
		}
	}
	return new batchFactory()	
}]);