const db = require('../config/db.config.js');
const Customer = db.customers;

// Post a Customer
exports.create = (req, res) => {	
	// Save to PostgreSQL database
	Customer.create({
				"cpf": req.body.cpf, 
				"name": req.body.name
			}).then(customer => {		
			// Send created customer to client
			res.json(customer);
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "error", details: err});
		});
};
 
// FETCH All Customers
exports.findAll = (req, res) => {
	Customer.findAll().then(customers => {
			// Send All Customers to Client
			res.json(customers.sort(function(c1, c2){return c1.id - c2.id}));
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "error", details: err});
		});
};

// Find a Customer by Id
exports.findById = (req, res) => {
	Customer.findById(req.params.cpf).then(customer => {
			res.json(customer);
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "error", details: err});
		});
};
 
// Update a Customer
exports.update = (req, res) => {
	const oldCus = req.body[0]
	const newCus = req.body[1]

	const cpf = oldCus.cpf;
	Customer.update( newCus, 
			{ where: {cpf: cpf} }).then(() => {
				res.status(200).json( { mgs: "Updated"} );
			}).catch(err => {
				console.log(err);
				res.status(500).json({msg: "error", details: err});
			});
};

// Delete a Customer by Id
exports.delete = (req, res) => {
	console.log("AAA " +req.params.cpf)	
	const cpf = req.params.cpf;
	Customer.destroy({
			where: { cpf: cpf }
		}).then(() => {
			res.status(200).json( { msg: 'Deleted Successfully -> Customer cpf = ' + cpf } );
		}).catch(err => {
			console.log(err);
			res.status(500).json({msg: "error", details: err});
		});
};