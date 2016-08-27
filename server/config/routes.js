var linens = require('../controllers/linens.js')
module.exports = function(app){
	app.post('/create_customer', linens.createCustomer);
	app.get('/get_customers', linens.getCustomers);
	app.post('/edit_customer/:id', linens.editCustomer);
	app.post('/delete_customer', linens.deleteCustomer);
	app.post('/create_item', linens.createItem);
	app.get('/get_items', linens.getItems);
	app.post('/edit_item/:id', linens.editItem);
	app.post('/delete_item', linens.deleteItem);
	app.get('/get_batchpounds', linens.getPerPounds);
	app.get('/get_batchitems', linens.getPerItems);
	app.post('/add_batch', linens.addBatch);
	app.get('/get_batches', linens.getBatches);
}

