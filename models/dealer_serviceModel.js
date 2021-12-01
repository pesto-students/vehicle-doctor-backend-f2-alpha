const Sequelize = require('sequelize');
const db = require('../utils/database');
const serviceTypes = require('./service_types');
const Dealer = require('./dealerModel');

const dealer_serviceModel = db.define(
	'dealer_service_tbl',
	{
		service_id: {
			type: Sequelize.BIGINT,
			autoIncrement: true,
			primaryKey: true
		},
		discription: {
			type: Sequelize.STRING
		},
		cost: {
			type: Sequelize.INTEGER
		},
		service_type_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: serviceTypes,
				key: serviceTypes.id
			}
		}
	},
	{
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'modified_at',
		freezeTableName: true
	}
);

dealer_serviceModel.belongsTo(serviceTypes, { foreignKey: 'service_type_id', as: 'serviceTypes' });

serviceTypes.hasOne(dealer_serviceModel, { foreignKey: 'service_type_id', as: 'serviceTypes' });

Dealer.hasMany(dealer_serviceModel, { as: 'Services' });

//Need for Future

// dealer_serviceModel.sync({ alter: true }).then(() => {
// 	console.log('table (re)created');
// });

module.exports = dealer_serviceModel;
