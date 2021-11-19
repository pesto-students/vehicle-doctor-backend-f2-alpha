const dealerModel = require('../models/dealerModel');
const dealerServices = require("../models/dealer_serviceModel");
const serviceBooking= require('../models/service_booking')
const Status = require('../models/service_status')
const vehicleModel = require('../models/vehicle_type');
const customerModel = require('../models/customerModel');
const ServiceHistory = require('../models/service_history');

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

exports.getCurrentBooking = async(req,res,next) =>{
    try {
        var referenceNum = req.params.refnum;
        let bookingDetails = await serviceBooking.findOne({
            attributes:['refrence_id','vehicle_reg_no','vehicle_model','pick_up','pick_up_date','drop_date'],
            where : { refrence_id:referenceNum},
            include:[
                {
                model:customerModel,
                as :'Customer',
                attributes:['customer_name']
               },
               {
                model:Status,
                as :'status',
                attributes:['status_name']
               },
               {
                model:dealerModel,
                as:'Dealer',
                attributes:['name','mobile']
               },
               {
                model:dealerServices,
                as :'dealerService',
                attributes:['discription']
               },
               {
                  model:vehicleModel,
                  as:'Vehicle_type',
                  attributes:['vehicle_type']
               }
            ]
        })
        res.send(bookingDetails);
    } catch (err) {
     if (!err.statusCode) {
         err.statusCode = 500;
       }
       next(err);
    }
 }

 // Add Feedback for a Service
exports.addServiceFeedback = async (req, res, next) => {
	try {
		// Check for Service Status before adding Feedback
		({ customer_id, dealer_id, service_ref_id } = req.body);
        //Fix Required
		//const service_status = checkServiceStatus(customer_id, dealer_id, service_ref_id);
		//if (service_status > 0) {
			const result = await ServiceHistory.create(req.body);
			res.status(201).json(result.id);
		// } else {
		// 	// Return zero if no Service History exists with a completed status
		// 	res.status(201).json(0);
		// }
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
