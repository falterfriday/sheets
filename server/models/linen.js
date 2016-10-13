var mongoose = require('mongoose')
var Schema = mongoose.Schema

var AdminSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		trim: true,
		required: [true, "You must enter a valid email address."]
	},
	password: {
		type: String,
		required: [true, "Your password must be at least 8 characters long and less than 32 characters long."]
	}
}, {timestamps:true})

AdminSchema.pre('save', function(done){
	if(this.isNew){
		return done();
	}
	bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
});

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
}, {timestamps: true})

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

mongoose.model('Admins', AdminSchema);
var Admins = mongoose.model('Admins')

mongoose.model('Batches', BatchSchema);
var Batches = mongoose.model('Batches')

mongoose.model('Items', ItemSchema); 
var Items = mongoose.model('Items')

mongoose.model('Customers', CustomerSchema); 
var Customers = mongoose.model('Customers')
