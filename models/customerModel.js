const { Sequelize, DataTypes } = require('sequelize');
const db = require('../utils/database');

// Sequelize model for Customer table
const Customer = db.define(
	'customer_tbl',
	{
		customer_id: {
			type: DataTypes.BIGINT,
			autoIncrement: true,
			primaryKey: true
		},
		customer_name: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		mobile: {
			type: DataTypes.STRING(10),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(100),
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

// //? sync db tables with models
// Customer.sync({ force: true }).then(() => {
// 	console.log('table (re)created');
// });

module.exports = Customer;
