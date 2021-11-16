const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/bookingcontroller');

router.post('/Service/Booking',bookingController.addCurrentBooking);

router.get('/currentbooking/:refnum',bookingController.getCurrentBooking)

module.exports = router;