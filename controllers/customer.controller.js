const Customer = require('../models/customerModel');
const CustomerAddress = require('../models/customer_address');
const serviceBooking = require('../models/service_booking');
const ServiceHistory = require('../models/service_history');

// Find Customer By Primary Key
exports.getCustomerById = async (req, res, next) => {
	try {
		const customerID = req.params.id;
		const customerData = await Customer.findByPk(customerID, {
			include: [
				{
					model: CustomerAddress,
					as: 'customer_location',
					attributes: ['locality', 'city', 'state', 'pincode', 'lat', 'long', 'isHomeAddress']
				}
			]
		});
		res.send(customerData);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

// Create New Customer
exports.createCustomer = async (req, res, next) => {
	try {
		const result = await Customer.create(req.body);
		const customerId = result.customer_id;

		let addressData = createAddress(result, req.body.location);
		let updatedCustomer = Object.assign({}, result, { addressData });
		res.json(result);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

// Function to create Customer's Address in Address table
const createAddress = async (customer_tbl_res, location) => {
	try {
		({ locality, city, state, pincode, lat, long, isHomeAddress } = location);
		({ customer_id } = customer_tbl_res);
		const result = await CustomerAddress.create({
			locality,
			city,
			state,
			pincode,
			lat,
			long,
			isHomeAddress,
			customer_id
		});
		console.log(`Address created with id: ${result.id}`);
		return result.dataValues;
	} catch (err) {
		console.log('Error while creating location : ', err);
	}
};

exports.addCurrentBooking = async (req, res, next) => {
	try {
		const result = await serviceBooking.create(req.body);
		res.status(201).json(result.refrence_id);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

// Add Feedback for a Service
exports.addServiceFeedback = async (req, res, next) => {
	try {
		const result = await ServiceHistory.create(req.body);
		res.status(201).json(result.id);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};
