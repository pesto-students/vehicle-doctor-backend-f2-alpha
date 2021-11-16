const { Sequelize, DataTypes } = require('sequelize');
const db = require('../utils/database');
const Customer = require('./customerModel');
const Dealer = require('./dealerModel');
const serviceBooking = require('./service_booking');

const ServiceHistory = db.define(
	'service_history_tbl',
	{
		id: {
			type: DataTypes.BIGINT,
			autoIncrement: true,
			primaryKey: true
		},
		rating: {
			type: DataTypes.TINYINT
		},
		comments: {
			type: DataTypes.STRING
		}
	},
	{ timestamps: true, createdAt: 'created_at', updatedAt: 'modified_at', freezeTableName: true }
);

// Define Customer - ServiceHistory one-to-many associations
Customer.hasMany(ServiceHistory, {
	foreignKey: { name: 'customer_id', allowNull: false },
	as: 'service_history'
});
ServiceHistory.belongsTo(Customer, {
	foreignKey: { name: 'customer_id', allowNull: false }
});

// Define Dealer - ServiceHistory one-to-many associations
Dealer.hasMany(ServiceHistory, {
	foreignKey: { name: 'dealer_id', allowNull: false },
	as: 'dealer_history'
});
ServiceHistory.belongsTo(Dealer, {
	foreignKey: { name: 'dealer_id', allowNull: false }
});

// Define ServiceBooking - ServiceHistory one-to-one associations
serviceBooking.hasOne(ServiceHistory, {
	foreignKey: { name: 'service_ref_id', allowNull: false },
	as: 'booking_history'
});
ServiceHistory.belongsTo(serviceBooking, {
	foreignKey: { name: 'service_ref_id', allowNull: false }
});

// //? sync db tables with models
// ServiceHistory.sync({ force: true }).then(() => {
// 	console.log('table (re)created');
// });

module.exports = ServiceHistory;
