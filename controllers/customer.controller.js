const Customer = require('../models/customerModel');
const CustomerAddress = require('../models/customer_address');
const serviceBooking= require('../models/service_booking')

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


exports.addCurrentBooking =async (req,res,next) =>{
	try{
	const result = await serviceBooking.create(req.body);  
	res.status(201).json(result.refrence_id);
	}
	catch(err){
		if (!err.statusCode) {
			err.statusCode = 500;
		  }
		  next(err);
	}
}