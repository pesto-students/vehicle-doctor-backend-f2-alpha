const dealerModel = require('../models/dealerModel');
const dealerServices = require("../models/dealer_serviceModel");
const serviceBooking= require('../models/service_booking')


exports.getDealerbyID = async (req, res, next) => {
    try {
    var dealerID = req.params.id;
    let dealerData = await dealerModel.findAll(
	{
        where :{dealer_id: dealerID},
        include:[{
            model:dealerServices,
            as :'Services'
        }]
	})
	res.json(dealerData);
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
           where : { refrence_id:referenceNum}
       })
       res.json(bookingDetails);
   } catch (error) {
    if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
   }
}

// router.get('/:id',async (req, res, next) =>{
// 	var dealerID = req.params.id;

//     let dealerData = await dealerModel.findAll(
// 	{
// 	where :{dealer_id: dealerID},
// 	include:[{
// 		model:dealerServices,
// 		as :'Services'
// 	}]
// 	})
// 	res.json(dealerData);
// });