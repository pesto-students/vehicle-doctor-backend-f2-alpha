const { Op } = require('sequelize');
const Customer = require('../models/customerModel');
const CustomerAddress = require('../models/customer_address');
const ServiceHistory = require('../models/service_history');
const serviceBooking = require('../models/service_booking');

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

// Add Feedback for a Service
exports.addServiceFeedback = async (req, res, next) => {
	try {
		// Check for Service Status before adding Feedback
		({ customer_id, dealer_id, service_ref_id } = req.body);
		const service_status = checkServiceStatus(customer_id, dealer_id, service_ref_id);
		if (service_status > 0) {
			const result = await ServiceHistory.create(req.body);
			res.status(201).json(result.id);
		} else {
			// Return zero if no Service History exists with a completed status
			res.status(201).json(0);
		}
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

// Get Service History based on Customer ID
exports.getServiceHistory = async (req, res, next) => {
	try {
		const customerID = req.params.id;
		const HistoryData = await ServiceHistory.findAll({
			where: { customer_id: customerID },
			include: [
				{
					model: serviceBooking,
					// as: 'booking_history',
					attributes: [
						'refrence_id',
						'vehicle_reg_no',
						'vehicle_model',
						'pick_up',
						'pick_up_date',
						'drop_date',
						'customer_id',
						'dealer_id',
						'service_id',
						'status_id',
						'vehicle_type_id'
					],
					where: { status_id: 6 }
				}
			]
		});
		res.status(201).send(HistoryData);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};

// Check the status of service if it is completed
const checkServiceStatus = async (customerId, dealerId, serviceId) => {
	try {
		const BookingData = await serviceBooking.findOne({
			where: {
				customer_id: customerId,
				dealer_id: dealerId,
				service_id: serviceId,
				status_id: 6
			},
			attributes: ['id']
		});
		return BookingData;
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
};
