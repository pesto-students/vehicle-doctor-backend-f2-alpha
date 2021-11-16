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
			allowNull: false
		},
		city: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		state: {
			type: DataTypes.STRING(45),
			allowNull: false
		},
		pincode: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		lat: {
			type: DataTypes.DECIMAL(10, 0),
			allowNull: false
		},
		long: {
			type: DataTypes.DECIMAL(10, 0),
			allowNull: false
		},
		isHomeAddress: {
			type: DataTypes.TINYINT(1),
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

Customer.hasMany(CustomerAddress, {
	foreignKey: { name: 'customer_id', allowNull: false },
	as: 'customer_location'
});
CustomerAddress.belongsTo(Customer, {
	foreignKey: { name: 'customer_id', allowNull: false }
});

//? sync db tables with models
// CustomerAddress.sync({ force: true }).then(() => {
// 	console.log('table (re)created');
// });

module.exports = CustomerAddress;
