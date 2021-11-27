const express = require('express');
const router = express.Router();

const dealerController = require('../controllers/dealercontroller');

router.get('/dealerByID/:id/:serviceID', dealerController.getDealerbyID);

router.get('/serviceType/:serviceType', dealerController.getDealerbyServiceType);

router.get('/dealersByCity/:city/:vehicleid', dealerController.getDealersByCity);

router.get('/serviceByDealerID/:id', dealerController.getServiceByDealerID);

router.post('/addDealer', dealerController.AddDealer);

router.post('/checkLogin', dealerController.checkDealerCredentials);

// router.get('/test', (req, res, next) => {
// 	res.send('All the service details');
// });

module.exports = router;
