const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

const indexRouter = require('./routes/index');
const vehicleRouter = require('./routes/vehicle');
const serviceRouter = require('./routes/service');
const dealerRouter = require('./routes/dealer');
const customerRouter = require('./routes/customer');

const port = process.env.port || 3001;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/vehicle', vehicleRouter);
app.use('/service', serviceRouter);
app.use('/dealer', dealerRouter);
app.use('/customer', customerRouter);

app.listen(port, () => {
	console.log('Deployment Project - Listening on port 3001');
});
