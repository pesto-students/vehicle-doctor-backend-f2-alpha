const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/bookingcontroller');

router.post('/Service/Booking',bookingController.addCurrentBooking);

router.get('/currentbooking/:refnum',bookingController.getCurrentBooking)

router.post('/service/feedback', bookingController.addServiceFeedback);

// Fetch customer service history using Customer Id
router.get('/service/feedback/:id', bookingController.getServiceHistory);

module.exports = router;