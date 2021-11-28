const Sequelize = require('sequelize');
require('dotenv').config()
 const host     = process.env.RDS_HOSTNAME;
 const user     = process.env.RDS_USERNAME;
 const password = process.env.RDS_PASSWORD;
 const port     = process.env.RDS_PORT;
 const dbname   = process.env.RDS_DB_NAME

// Creating new Object of Sequelize
const sequelize = new Sequelize(`${dbname}`, `${user}`, `${password}`, {
	// Explicitly specifying
	// mysql database
	dialect: 'mysql',
    port:port,
	// By default host is 'localhost'
	host: `${host}`,
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
