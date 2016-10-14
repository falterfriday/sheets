var items      = require('../controllers/items.js'),
    batches    = require('../controllers/batches.js'),
    customers  = require('../controllers/customers.js'),
    admins	   = require('../controllers/admins.js');

module.exports = function(app){
	app.post('/create_customer', customers.createCustomer);
	app.get('/get_customers', customers.getCustomers);
	app.post('/edit_customer/:id', customers.editCustomer);
	app.post('/delete_customer', customers.deleteCustomer);
	app.post('/create_item', items.createItem);
	app.get('/get_items',items.getItems);
	app.post('/edit_item/:id', items.editItem);
	app.post('/delete_item', items.deleteItem);
	app.post('/add_batch', batches.addBatch);
	app.get('/get_batches', batches.getBatches);
	app.post('/update_status', batches.updateStatus);
	app.post('/createAdmin', admins.createAdmin);
	app.post('/deleteAdmin', admins.destroyAdmin);
	app.get('/getAdmins', admins.getAdmin);
	app.post('/checkAdmin', admins.verifyAdmin);
	app.post('/checkMaster', admins.verifyMaster);
}
