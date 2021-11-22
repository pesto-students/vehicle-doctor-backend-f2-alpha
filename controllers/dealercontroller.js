const dealerModel = require('../models/dealerModel');
const dealerServices = require("../models/dealer_serviceModel");
const vehicleModel = require('../models/vehicle_type');
const serviceModel = require('../models/service_history');
const serviceTypes = require('../models/service_types')
const { Sequelize } = require('sequelize');


exports.getDealerbyID = async (req, res, next) => {
    try {
    var dealerID = req.params.id;
    let dealerData = await dealerModel.findOne(
	{
        attributes:['name','mobile','gst_no','locality','city','state','pincode'],
        where :{dealer_id: dealerID},
        include:[
             {
               model:vehicleModel,
               as :'Vehicletype',
               attributes: ['vehicle_type']
             },
            {  
              model:dealerServices,
              as :'Services' ,
              attributes:['discription','cost']
            },
            {
              model:serviceModel,
              as:'dealer_history',
              attributes:['rating','comments'],
              order: [["created_at", "DESC"]],
              limit:3
            }
        ]
	})
	res.json(dealerData);
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };

exports.getDealerbyServiceType = async (req, res, next) => {
   try{
        var serviceType = req.params.serviceType;
        let dealersResult = await dealerModel.findAll(
          
            {
          
            include:[
            {
              model:dealerServices,
              as :'Services',
              where :{service_type_id: serviceType},
            }, 
            {
              model:vehicleModel,
              as :'Vehicletype',
              attributes: ['vehicle_type']
            },
            {
              model:serviceModel,
              as:'dealer_history',
              attributes:['rating','comments'],
              order: [["created_at", "DESC"]],
              limit:3
            }
          ],
          })
            res.json(dealersResult)
     }
     catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };

  exports.getDealersByCity = async (req, res, next) => {
    try{
        var cityValue = req.params.city;
        var vehicleId = req.params.vehicleid;

          let dealersResult = await dealerModel.findAll(
             {
              where :{city: cityValue},
              include:[
                {
                  model:vehicleModel,
                  as :'Vehicletype',
                  attributes: ['vehicle_type'],
                  where:{id:vehicleId}
                },
               {  
                 model:dealerServices,
                 as :'Services' ,
                 attributes:['discription','cost']
               },
               {
                model:serviceModel,
                as:'dealer_history',
                attributes:['rating','comments'],
                order: [["created_at", "DESC"]],
                limit:3
              }
           ]
            })
             res.json(dealersResult)
      }
      catch (err) {
       if (!err.statusCode) {
         err.statusCode = 500;
       }
       next(err);
     }
   };

   exports.getServiceByDealerID = async (req, res, next) => {
    try{
        var id = req.params.id;
          let servicesResult = await dealerServices.findAll(
             {
              attributes:['service_id'],
              where :{dealerTblDealerId: id},
              include:[
                {
                 model: serviceTypes,
                 as :'serviceTypes' ,
                 attributes:['service_type']
                }
           ]
            })
             res.json(servicesResult)
      }
      catch (err) {
       if (!err.statusCode) {
         err.statusCode = 500;
       }
       next(err);
     }
   };

  exports.AddDealer = async (req, res, next) => {
    try{
          const result = await dealerModel.create(req.body);  
          const resultID=result.dealer_id;
          var serviceData = req.body.services.map(function(item) {
            var updatedService = Object.assign({}, item);
            updatedService.dealerTblDealerId =resultID
            return updatedService;
          })
          await dealerServices.bulkCreate(serviceData)      
          res.json(result);
    }
    catch(err) {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
 }
  };