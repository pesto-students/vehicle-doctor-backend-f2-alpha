const express = require('express');
const router = express.Router();

const dealerController = require('../controllers/dealercontroller');

router.get('/dealerByID/:id',dealerController.getDealerbyID);

router.get('/serviceType/:serviceType',dealerController.getDealerbyServiceType);

router.get('/dealersByCity/:city',dealerController.getDealersByCity);

router.post('/addDealer',dealerController.AddDealer)

module.exports = router;
