const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.send('All the vehicle details');
});

router.get('/types', (req, res, next) => {
	res.send('GET the vehicles ID and types from DB');
});

module.exports = router;
