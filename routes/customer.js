const express = require('express');
const router = express.Router();
const customers = require('../controllers/customer.controller');


// Retrieve customer details with Customer Id
router.get('/:id', customers.getCustomerById);

router.get('/search/:mobile', customers.getCustomerByMobileNum);

// Add a customer
router.post('/add', customers.createCustomer);

module.exports = router;
