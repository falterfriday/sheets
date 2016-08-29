var mongoose = require('mongoose');
var Batches = mongoose.model('Batches');
function BatchesController(){
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

module.exports = new BatchesController();
