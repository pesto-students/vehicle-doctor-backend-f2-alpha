const Sequelize = require('sequelize');
const db = require('../utils/database');

// Sequelize model for Customer table
const Customer = db.define(
	'customer_tbl',
	{
		customer_id: {
			type: Sequelize.BIGINT,
			autoIncrement: true,
			primaryKey: true
		},
		customer_name: {
			type: Sequelize.STRING(100),
			allowNull: false
		},
		mobile: {
			type: Sequelize.STRING(10),
			allowNull: false
		},
		email: {
			type: Sequelize.STRING(100),
			allowNull: false
		}
	},
	{
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'modified_at',
		freezeTableName: true
	}
);

//? sync db tables with models
// Customer.sync({ force: true }).then(() => {
// 	console.log('table (re)created');
// });

module.exports = Customer;
