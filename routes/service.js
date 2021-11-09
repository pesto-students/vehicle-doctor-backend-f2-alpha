const express = require('express');
const router = express.Router();
const Status = require('../models/service_status')
const serviceTypes = require('../models/service_types')

router.get('/', (req, res, next) => {
	res.send('All the service details');
});

router.get('/types', (req, res, next) => serviceTypes.findAll()
			.then(serviceTypes=>
			res.send(serviceTypes))
			.catch(err => res.send(err)));

router.get('/status', (req, res, next) => Status.findAll()
			.then(status=>
			res.send(status))
			.catch(err => res.send(err)));

module.exports = router;
