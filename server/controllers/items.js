var mongoose = require('mongoose');
var Items = mongoose.model('Items');
function ItemsController(){
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
}
module.exports = new ItemsController(); 