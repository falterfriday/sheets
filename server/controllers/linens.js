var mongoose = require('mongoose');
var Batches = mongoose.model('Batches');
var Items = mongoose.model('Items');
var Customers = mongoose.model('Customers');
function LinensController(){
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
	this.createItem = function(req, res){
		var item = new Items(
		{
			name: req.body.name,
			type: req.body.type,
			size: req.body.size,
			charge : req.body.per, 
			price: req.body.price
		});
		item.save(function(err){
			if(err){
				res.json(err);
			}else{
				res.json(item);
			}
		});
	}
	this.getItems = function(req, res){
		Items.find({}, function	(items, err){
			if(err){
				res.json(err);
			}else{
				res.json(items);
			}
		});
	}
	this.editItem = function(req, res){
		Items.findOne({_id: req.params.id}, function(err, item){
			if(err){
				res.json(err);
			}else{
				item.name= req.body.name;
				item.type= req.body.type; 
				item.size= req.body.size;
				item.charge= req.body.per; 
				item.price= req.body.price;
				item.save(function(err){
					if(err){
						res.json(err);
					}else{
						res.send();
					}	
				});		
			}
		}); 
	}
	this.deleteItem = function(req, res){
		Items.remove({_id: req.body.id}, function(err){
			if(err){
				res.json(err);
			}else{
				res.send();
			}
		});
	}
	this.addBatch = function(req, res){
		var batch = new Batches(
		{
			status: req.body.status, 
			instructions: req.body.instructions, 
			due_date: req.body.due_date, 
			_customer: req.body._customer,
			order: req.body.order
		});
		batch.save(function(err){
			if(err){
				res.json(err);
			}else{
				res.send()
			}
		});
	}
	this.getBatches = function(req, res){
		Batches.find({})
		.populate("_customer")
		.exec(function(err,batches ){
			if(err){
				res.json(err);
			}else{
				res.json(batches);
			}
		});
	}
	this.updateStatus = function(req, res){
		console.log(req.body)
		Batches.findOne({ _id: req.body._id}, function(err, batch){
			if(err){
				res.json(err);
			}else{
				if(batch.status == "Received")
					batch.status = "Washing";
				else if(batch.status == "Washing")
					batch.status = "Dry";
				else if(batch.status == "Dry")
					batch.status = "Fold";
				else if(batch.status == "Fold")
					batch.status = "Finishing";
				else if(batch.status == "Finishing")
					batch.status = "Completed";
				console.log(batch, 'controlllererrrrrr');
				batch.save(function(err){
					if (err){
						res.json(err);
					}else{
						res.send();
					}
				});
			}
		});
	}
}

module.exports = new LinensController();
