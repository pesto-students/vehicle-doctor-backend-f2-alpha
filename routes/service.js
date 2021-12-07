const express = require('express');
const router = express.Router();
const Status = require('../models/service_status');
const serviceTypes = require('../models/service_types');

router.get('/', (req, res, next) => {
	res.send('All the service details');
});

router.get('/types', (req, res) =>
	serviceTypes
		.findAll({
			attributes: ['id', 'service_type', 'service_name','service_image_url']
		})
		.then((serviceTypes) => res.send(serviceTypes))
		.catch((err) => res.send(err))
);

router.get('/types/:service_type', (req, res, next) =>
	serviceTypes
		.findAll({
			where: { service_type: req.params.service_type }
		})
		.then((serviceTypes) => res.send(serviceTypes))
		.catch((err) => res.send(err))
);

router.get('/status', (req, res, next) =>
	Status.findAll()
		.then((status) => res.send(status))
		.catch((err) => res.send(err))
);

module.exports = router;
