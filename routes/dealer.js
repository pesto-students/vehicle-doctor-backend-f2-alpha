const express = require('express');
const router = express.Router();
const dealerModel = require('../models/dealerModel');
const dealerServices = require("../models/dealer_serviceModel");

router.get('/', (req, res, next) => {
	res.send('All the dealer details');
});

router.get('/alldealers', (req, res, next) => dealerModel.findAll()
			.then(dealers=>
			res.send(dealers))
			.catch(err => res.send(err)));

router.get('/dealerServices', (req, res, next) => dealerServices.findAll()
			.then(dealerServices=>
			res.send(dealerServices))
			.catch(err => res.send(err)));

router.post('/addDealer', (req, res) => {
	let created_at = datetime.now;
	let modified_at = datetime.now;
	let {dealer_id,name,mobile,email,password,gst_no,locality,city,state,
	      pincode,lat,lng,vehicle_type_id} = req.body;

	dealerModel.create({
			dealer_id,name,mobile,email,password,gst_no,locality,city,state,
			pincode,lat,lng,vehicle_type_id,created_at,modified_at
		  })
			.then(dealerModel => res.redirect(dealerModel.dealer_id))
			.catch(err => res.render('error', {error:err.message}))
});
module.exports = router;
