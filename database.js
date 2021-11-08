const Sequelize = require('sequelize');

// Specify local username / password for dev machine
// Can be changed for production
const DATABASE_USER_NAME = 'root';
const DATABASE_PASSWORD = '';

// Creating new Object of Sequelize
const sequelize = new Sequelize('DealerFinder', `${DATABASE_USER_NAME}`, `${DATABASE_PASSWORD}`, {
	// Explicitly specifying
	// mysql database
	dialect: 'mysql',

	// By default host is 'localhost'
	host: 'localhost'
});

// Exporting the sequelize object.
// We can use it in another file
// for creating models
module.exports = sequelize;
