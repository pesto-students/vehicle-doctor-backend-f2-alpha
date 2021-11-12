const Sequelize = require('sequelize');
const sequelize = require('../utils/database');
const db = require('../utils/database');
const Customer = require('./customerModel');

// Sequelize model for Customer_Address table
const CustomerAddress = db.define(
	'customer_add_tbl',
	{
		id: {
			type: Sequelize.BIGINT,
			autoIncrement: true,
			primaryKey: true
		},
		locality: {
			type: Sequelize.STRING(200),
			allowNull: false
		},
		city: {
			type: Sequelize.STRING(45),
			allowNull: false
		},
		state: {
			type: Sequelize.STRING(45),
			allowNull: false
		},
		pincode: {
			type: Sequelize.BIGINT,
			allowNull: false
		},
		lat: {
			type: Sequelize.DECIMAL(10, 0),
			allowNull: false
		},
		long: {
			type: Sequelize.DECIMAL(10, 0),
			allowNull: false
		},
		isHomeAddress: {
			type: Sequelize.TINYINT(1),
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

//Customer.hasMany(CustomerAddress);
CustomerAddress.belongsTo(Customer, { foreignKey: 'customer_id' });

//? sync db tables with models
// CustomerAddress.sync({ force: true }).then(() => {
// 	console.log('table (re)created');
// });

module.exports = CustomerAddress;
