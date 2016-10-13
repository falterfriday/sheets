var mongoose = require('mongoose');
var Admins = mongoose.model('Admins');
function AdminsController(){

	this.verifyMaster = function(req,res){
		var admin =
			{email: req.body.email,
			password: req.body.password}
		if(admin.email == "jauschalley@gmail.com" && admin.password == "Trucker6210"){
			res.json(admin)
		}else{
			err = "The information given does not match our records."
			res.json(err)
		};
	};

	this.createAdmin = function(req, res){
		var admin = Admins({
			email: req.body.email,
			password: req.body.password
		})
		admin.save(function(err, results){
			if(err){
				res.json(err);
			}else{
				res.json(results);
			}
		})
	};

	this.verifyAdmin = function(req, res){
		console.log(req.body)
		Admin.findOne({email: req.body.email}, function(err, user){
			if(err){
				res.json(err);
			}else{
				res.json(user)
			}
		})
	};

	this.getAdmin = function(req,res){
		Admin.find({}, function(admins, err){
			if(err){
				res.json(err);
			}else{
				res.json(admins);
			}
		});
	};

	this.deleteAdmin = function(req,res){
		Admins.remove({_id: req.ody.id}, function(err){
			if(err){
				res.json(err);
			}else{
				res.send()
			}
		});
	}
};
module.exports = new AdminsController();