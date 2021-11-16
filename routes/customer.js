const express = require('express');
const router = express.Router();
const customers = require('../controllers/customer.controller');

router.get('/', (req, res, next) => {
	res.send('All the customer details');
});

// Retrieve customer details with Customer Id
router.get('/:id', customers.getCustomerById);

// Add a customer
router.post('/add', customers.createCustomer);

router.post('/Service/Booking',customers.addCurrentBooking);

module.exports = router;
