const express = require('express');
const router = express.Router();
//const custAddressModel = require('../models/customer_address');
const customers = require('../controllers/customer.controller');

router.get('/', (req, res, next) => {
	res.send('All the customer details');
});

// Retrieve customer details with Customer Id
router.get('/:id', customers.findOne);

module.exports = router;
