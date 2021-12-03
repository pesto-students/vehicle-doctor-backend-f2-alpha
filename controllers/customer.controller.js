const { Op } = require('sequelize');
const Customer = require('../models/customerModel');
const CustomerAddress = require('../models/customer_address');

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

exports.getCustomerByMobileNum = async (req, res, next) => {
	try {
		const mobile = req.params.mobile;
		const customerData = await Customer.findOne({
			attributes: ['customer_name','mobile','email'],
			where: { mobile: mobile },
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
		let addressData = await createAddress(result, req.body.location);
		let updatedCustomer = Object.assign({}, result.dataValues, { addressData });
		res.json(updatedCustomer);
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






