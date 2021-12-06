const { Sequelize, DataTypes } = require('sequelize');
const db = require('../utils/database');
const Customer = require('./customerModel');

// Sequelize model for Customer_Address table
const CustomerAddress = db.define(
	'customer_add_tbl',
	{
		id: {
			type: DataTypes.BIGINT,
			autoIncrement: true,
			primaryKey: true
		},
		locality: {
			type: DataTypes.STRING(200),
		},
		city: {
			type: DataTypes.STRING(45),
		},
		state: {
			type: DataTypes.STRING(45),
		},
		pincode: {
			type: DataTypes.BIGINT,
		},
		lat: {
			type: DataTypes.DECIMAL(10, 0),
		},
		long: {
			type: DataTypes.DECIMAL(10, 0),
		},
		isHomeAddress: {
			type: DataTypes.TINYINT(1),
		}
	},
	{
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'modified_at',
		freezeTableName: true
	}
);

Customer.hasOne(CustomerAddress, {
	foreignKey: { name: 'customer_id', allowNull: false },
	as: 'customer_location'
});
CustomerAddress.belongsTo(Customer, {
	foreignKey: { name: 'customer_id', allowNull: false }
});

//? sync db tables with models
// CustomerAddress.sync({ alter: true }).then(() => {
// 	console.log('table (re)created');
// });

module.exports = CustomerAddress;
