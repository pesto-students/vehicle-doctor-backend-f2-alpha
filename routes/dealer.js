const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.send('All the dealer details');
});

module.exports = router;
