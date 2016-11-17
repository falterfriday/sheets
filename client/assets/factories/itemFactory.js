/* esversion: 6 */
app.factory('itemFactory', ['$http', function($http){
	function itemFactory(){
		this.create = function(item, callback){
			$http.post('/create_item', item).then(function(results){
				callback(results.data);
			});
		};
		this.delete = function(id, callback){
			$http.post('/delete_item', id).then(function(results){
				callback(results.data);
			});
		};
		this.edit = function(id, item, callback){
			$http.post(`/edit_item/${id}`, item).then(function(results){
					callback(results.data);
			});
		};
		this.all = function(callback){
			$http.get('/get_items').then(function(results){
				callback(results.data);
			});
		};
	}
	return new itemFactory();
}]);
