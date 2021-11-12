const express = require('express');
const router = express.Router();
const dealerModel = require('../models/dealerModel');
const dealerServices = require("../models/dealer_serviceModel");


router.get('/:id',async (req, res, next) =>{
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
});


router.get('/dealers/:serviceType',async (req, res, next)  =>{
	var serviceType = req.params.serviceType;

    let dealersResult = await dealerModel.findAll(
	{
	include:[{
		model:dealerServices,
		as :'Services',
		where :{service_type_id: serviceType},
	}]
	})
	res.json(dealersResult);
})


router.get('/alldealers/:city',async (req, res, next) =>{
	var cityValue = req.params.city;

    let dealersResult = await dealerModel.findAll(
	{
	where :{city: cityValue},
	include:[{
		model:dealerServices,
		as :'Services'
	}]
	})
	res.json(dealersResult);
});



router.post('/addDealer', async (req, res) => {
	const result = await dealerModel.create(req.body);  
	const resultID=result.dealer_id;
	console.log(resultID);
	var serviceData = req.body.services.map(function(item) {
		var updatedService = Object.assign({}, item);
		updatedService.dealerTblDealerId =resultID
		return updatedService;
	})
	console.log(serviceData);
	await dealerServices.bulkCreate(serviceData)      
    res.json(result);
});
module.exports = router;
