const express = require('express');
const router = express.Router();
const customers = require('../controllers/customer.controller');

router.get('/', (req, res, next) => {
	res.send('All the customer details');
});

// Retrieve customer details with Customer Id
router.get('/:id', customers.getCustomerById);

// Fetch customer service history using Customer Id
router.get('/service/feedback/:id', customers.getServiceHistory);

// Add a customer
router.post('/add', customers.createCustomer);

// Add service feedback
router.post('/service/feedback', customers.addServiceFeedback);

module.exports = router;
