var mongoose = require('mongoose');
var Customers = mongoose.model('Customers');
function CustomersController(){
	this.createCustomer= function(req, res){
		var customer = new Customers(
			{
				name: req.body.name, 
				contact_name: req.body.contact_name, 
				phone: req.body.phone, 
				email: req.body.email, 
				address: req.body.address,
				address2: req.body.address2, 
				address3: req.body.address3, 
				weight_price: req.body.weight, 
				comments: req.body.comments
			});
		customer.save(function(err){
			if(err){
				res.json(err);
			}else{
				res.json(customer);
			}
		});
	}
	this.getCustomers = function(req, res){
		Customers.find({}, function	(customers, err){
			if(err){
				res.json(err);
			}else{
				res.json(customers);
			}
		});
	}
	this.editCustomer = function(req, res){
		Customers.findOne({_id: req.params.id}, function(err, customer){
			if(err){
				res.json(err);
			}else{
				customer.name= req.body.name;
				customer.contact_name= req.body.contact_name; 
				customer.phone= req.body.phone;
				customer.email= req.body.email; 
				customer.address= req.body.address
				customer.address2 = req.body.address2;
				customer.address3 = req.body.address3;
				customer.weight_price= req.body.weight; 
				customer.comments= req.body.comments;
				customer.save(function(err){
					if(err){
						res.json(err);
					}else{
						res.send();
					}	
				});		
			}
		}); 
	}
	this.deleteCustomer = function(req, res){
		Customers.remove({_id: req.body.id}, function(err){
			if(err){
				res.json(err);
			}else{
				res.send();
			}
		});
	}
}

module.exports = new CustomersController();