var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
}, {timestamps:true});

AdminSchema.pre('save', function(done){
	if(this.isNew){
		return done();
	}
	bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
});

var BatchSchema = new mongoose.Schema({
	status: String,
	instructions: String,
	due_date: String,
	_customer: {
		type: Schema.Types.ObjectId,
		ref: "Customers"
	},
	order: [{
		name: String,
		price: String,
		charge: String,
		quantity: String,
		subtotal: String
	}]
}, {timestamps: true});

var ItemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Your item must have a name."],
		maxlength: 60,
		trim: true,
	},
	type: {
		type: String,
		maxlength: 20,
		trim: true,
	},
	size: { type: String, maxlength: 20},
	charge : {
		type: String,
		required: [true, "Do you plan to charge per item or per pound."],
		maxlength: 10,
		trim: true,
	},
	price: {
		type: String,
		required: true,
		maxlength: 20,
		trim: true,
	},
	// created_by: {
	// 	type: String,
	// 	required: true,
	// 	maxlength: 20,
	// 	trim: true,
	// },
}, {timestamps: true});

var CustomerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "You must enter the company's name."],
		maxlength: 40,
		trim: true,
	},
	contact_name: {
		type: String,
		required: [true, "You really want to have a person to contact for questions."],
		maxlength: 20,
		trim: true,
	},
	phone: {
		type: String,
		required: [true, "You must enter a phone number."],
		maxlength: 20,
		trim: true,
	},
	email: {
		type: String,
		required: [true, "We need to have a email address for billing."],
		maxlength: 40,
		trim: true,
	},
	address: {
		type: String,
		required: [true, "You must enter a deliery or billing address."],
		maxlength: 40
	},
	address2: {
		type: String,
		required: true,
		maxlength: 40
	},
	address3: {
		type: String,
		required: true,
		maxlength: 40
	},
	weight_price: Number,
	comments: {
		type: String,
		required: true,
		 maxlength: 60,
		 trim: true,
		},
}, {timestamps:true});

mongoose.model('Admins', AdminSchema);
var Admins = mongoose.model('Admins');

mongoose.model('Batches', BatchSchema);
var Batches = mongoose.model('Batches');

mongoose.model('Items', ItemSchema);
var Items = mongoose.model('Items');

mongoose.model('Customers', CustomerSchema);
var Customers = mongoose.model('Customers');
