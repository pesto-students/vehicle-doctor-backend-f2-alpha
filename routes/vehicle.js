const express = require('express');
const router = express.Router();
const sequelize = require('../utils/database');
const VehicleType = require('../models/vehicle_type');
const UUID = require('uuid');

router.get('/', (req, res, next) => {
	res.send('All the vehicle details');
});

// Get vehicle Type list
router.get('/types', (req, res) =>
	VehicleType.findAll()
		.then((vehicle_types) => {
			res.send(vehicle_types);
			console.log(vehicle_types);

			//res.sendStatus(200);
		})
		.catch((err) => console.log(err))
);

// Add a vehicle type
router.get('/addtype', (req, res) => {
	var datetime = new Date();
	let created_at = datetime.now;
	let modified_at = datetime.now;
	let { id,vehicle_type} = req.body;
	
	VehicleType.create({ id,vehicle_type,created_at,modified_at })
		.then((type) => res.redirect('/vehicle/types'))
		.catch((err) => console.log(err));
});

module.exports = router;
