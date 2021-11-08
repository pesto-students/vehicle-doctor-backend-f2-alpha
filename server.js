const express = require('express');
const path = require('path');
const app = express();

const indexRouter = require('./routes/index');
const vehicleRouter = require('./routes/vehicle');
const serviceRouter = require('./routes/service');

const port = process.env.port || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/vehicle', vehicleRouter);
app.use('/service', serviceRouter);

app.listen(port, () => {
	console.log('Deployment Project - Listening on port 3001');
});
