const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.send('Welcome to the home page!');
});

module.exports = router;
