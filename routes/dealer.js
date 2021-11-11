const express = require('express');
const router = express.Router();
const dealerModel = require('../models/dealerModel');
const dealerServices = require("../models/dealer_serviceModel");

router.get('/', (req, res, next) => {
	res.send('All the dealer details');
});


router.get('/alldealers/:city',async (req, res, next) =>{
	var cityValue = req.params.city;

    let dealersResult = await dealerModel.findAll(
	{
	where :{city: cityValue}
	})
	res.json(dealersResult);
});

router.get('/dealerServices', (req, res, next) => dealerServices.findAll()
			.then(dealerServices=>
			res.send(dealerServices))
			.catch(err => res.send(err)));

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
