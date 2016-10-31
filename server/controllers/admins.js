var mongoose = require('mongoose');
var Admins = mongoose.model('Admins');
function AdminsController(){

	this.verifyMaster = function(req,res){
		var login = {
			email: req.body.email,
			password: req.body.password
		};
		if(login.email == "jauschalley@gmail.com" && login.password == "Trucker6210"){
			login.master = "master";
			login.admin = "no";
			res.json(login);
		} else {
			err = {
				message: "The information given does not match our records."
			};
			res.json(err);
		}
	};

	this.createAdmin = function(req, res){
		var admin = Admins({
			email: req.body.email,
			password: req.body.password
		});
		admin.save(function(err, results){
			if(err){
				res.json(err);
			}else{
				res.json(results);
			}
		});
	};

	this.verifyAdmin = function(req, res){
		Admins.findOne({email: req.body.email}, function(err, user){
			if(err){
				console.log("error")
				console.log("///////")
				res.json(err);
			} else {
				console.log("/////////////////////////////////")
				console.log(user)
				res.json(user);
			}
		});
	};

	this.getAdmin = function(req,res){
		Admins.find({}, function(admins, err){
			if(err){
				res.json(err);
			} else {
				res.json(admins);
			}
		});
	};

	this.destroyUser = function(req,res){
		Admins.remove({_id: req.params.id}, function(err){
			if(err){
				res.json(err);
			}else{
				res.send();
			}
		});
	};
}
module.exports = new AdminsController();
