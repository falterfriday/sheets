app.factory('adminFactory', ['$http', function($http){

	function adminFactory(){
		this.create = function(admin, callback){
			$http.post('/createAdmin', admin).then(function(results){
				callback(results.data);
			})
		}
		this.delete = function(id, callback){
			console.log(id)
			$http.post('/deleteAdmin', id).then(function(results){
				callback(results.data)
			})
		}
		this.allAdmins = function(callback){
			$http.get('/getAdmins').then(function(results){
				callback(results.data);
			});
		}
		this.verifyAdmin = function(login, callback){
			$http.post('/checkAdmin', login).then(function(results){
				callback(results.data)
			});
		}
		this.verifyMaster = function(login, callback){
			$http.post('/checkMaster', login).then(function(results){
				console.log(results.data)
				callback(results.data)
			});
		}
	}
	return new adminFactory();	
}]);