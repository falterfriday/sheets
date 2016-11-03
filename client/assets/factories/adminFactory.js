app.factory('adminFactory', ['$http', function($http){

	function adminFactory(){

		var current_user = {};

		this.create = function(admin, callback){
			$http.post('/createAdmin', admin).then(function(results){
				callback(results.data);
			});
		};
		this.delete = function(id, callback){
			$http.post('/deleteUser/'+id).then(function(results){
				callback(results.data);
			});
		};
		this.allAdmins = function(callback){
			$http.get('/getAdmins').then(function(results){
				callback(results.data);
			});
		};
		this.verifyAdmin = function(login, callback){
			$http.post('/checkAdmin', login).then(function(results){
				if (results.data){
					current_user.master = "no";
					current_user.admin = "admin";
					callback(results.data);
				} else {
					current_user.master = "no";
					current_user.admin = "no";
					callback(results.data);
				}
			});
		};
		this.verifyMaster = function(login, callback){
			console.log("aF login = ", login);
			$http.post('/checkMaster', login).then(function(results){
				current_user.master = results.data.master;
				current_user.admin = results.data.admin;
				// console.log("current_user = ", current_user);
				callback(results.data);
			});
		};
		this.getUserStatus = function(callback){
			callback(current_user);
		};
	}
	return new adminFactory();
}]);
