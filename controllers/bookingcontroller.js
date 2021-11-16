const dealerModel = require('../models/dealerModel');
const dealerServices = require("../models/dealer_serviceModel");
const serviceBooking= require('../models/service_booking')
const Status = require('../models/service_status')
const vehicleModel = require('../models/vehicle_type');
const customerModel = require('../models/customerModel');

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