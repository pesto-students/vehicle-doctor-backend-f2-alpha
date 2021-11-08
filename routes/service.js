const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.send('All the service details');
});

router.get('/types', (req, res, next) => {
	res.send('GET the service ID and types from DB');
});

router.get('/status', (req, res, next) => {
	res.send('GET the service ID and statuses from DB');
});

module.exports = router;
