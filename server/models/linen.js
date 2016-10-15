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
	status: { type: String, required: true, maxlength: 15}, 
	instructions: { type: String, maxlength: 60}, 
	recieved_by: { type: String, maxlength: 20}
	due_date: String, 
	_customer: {type: Schema.Types.ObjectId, ref: "Customers"},
	order: [{
		name: { type: String, maxlength: 20}
		price: { type: String, maxlength: 20}
		charge: { type: String, maxlength: 20} 
		quantity: { type: String, maxlength: 20}
		subtotal: { type: String, maxlength: 20}	
	}]
}, {timestamps: true})

var ItemSchema = new mongoose.Schema({
	name: { type: String, required: true, maxlength: 60}, 
	type: { type: String, required: true, maxlength: 20}, 
	size: { type: String, required: true, maxlength: 20}, 
	charge : { type: String, required: true, maxlength: 60},  
	price: { type: String, required: true, maxlength: 20},  
	created_by: { type: String, required: true, maxlength: 20}, 
}, {timestamps: true});

var CustomerSchema = new mongoose.Schema({
	name: { type: String, required: true, maxlength: 40}, 
	contact_name: { type: String, required: true, maxlength: 20}, 
	phone: { type: String, required: true, maxlength: 20}, 
	email: { type: String, required: true, maxlength: 40}, 
	address: { type: String, required: true, maxlength: 40}, 
	address2: { type: String, required: true, maxlength: 40},  
	address3: { type: String, required: true, maxlength: 40}, 
	weight_price: Number, 
	comments: { type: String, required: true, maxlength: 60}, 
}, {timestamps:true});

mongoose.model('Admins', AdminSchema);
var Admins = mongoose.model('Admins')

mongoose.model('Batches', BatchSchema);
var Batches = mongoose.model('Batches')

mongoose.model('Items', ItemSchema); 
var Items = mongoose.model('Items')

mongoose.model('Customers', CustomerSchema); 
var Customers = mongoose.model('Customers')
