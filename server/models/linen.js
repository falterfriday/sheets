var mongoose = require('mongoose')
var Schema = mongoose.Schema

var BatchSchema = new mongoose.Schema({ 
	status: String, 
	instructions: String, 
	recieved_by: String,
	due_date: String, 
	_customer: {type: Schema.Types.ObjectId, ref: "Customers"},
	order: [{
		name: String,
		price: Number, 
		charge: String, 
		quantity: Number,
		subtotal: Number	
	}]
}, {timestamps: true});

var ItemSchema = new mongoose.Schema({
	name: String,
	type: String,
	size: String,
	charge : String, 
	price: Number, 
	created_by: String
}, {timestamps: true});

var CustomerSchema = new mongoose.Schema({
	name: String,
	contact_name: String,
	phone: String, 
	email: String, 
	address: String,
	address2: String, 
	address3: String,
	weight_price: Number, 
	comments: String
}, {timestamps:true});

mongoose.model('Batches', BatchSchema);
var Batches = mongoose.model('Batches')

mongoose.model('Items', ItemSchema); 
var Items = mongoose.model('Items')

mongoose.model('Customers', CustomerSchema); 
var Customers = mongoose.model('Customers')
