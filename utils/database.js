const Sequelize = require('sequelize');

// Specify the connection for rds
const DB_HOST = 'aws-simplified.cf4zjdrz011j.us-east-2.rds.amazonaws.com';
const DATABASE_USER_NAME = 'admin';
const DATABASE_PASSWORD = 'Fiserv05';
const DB_NAME = 'drvehicle';

// Creating new Object of Sequelize
const sequelize = new Sequelize(`${DB_NAME}`, `${DATABASE_USER_NAME}`, `${DATABASE_PASSWORD}`, {
	// Explicitly specifying
	// mysql database
	dialect: 'mysql',

	// By default host is 'localhost'
	host: `${DB_HOST}`,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
});

// Exporting the sequelize object.
// We can use it in another file
// for creating models
module.exports = sequelize;
