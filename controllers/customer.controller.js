const Customer = require('../models/customerModel');
const CustomerAddress = require('../models/customer_address');

// Find Customer By Primary Key
exports.findOne = (req, res) => {
	const id = req.params.id;

	Customer.findByPk(id)
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find Customer with id=${id}.`
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: 'Error retrieving Customer with id=' + id
			});
		});
};
