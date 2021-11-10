const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

//Test DB
sequelize
	.authenticate()
	.then(() => console.log('Database connected...'))
	.catch((err) => console.log(`Error: ${err}`));

// sequelize model for vehicle_type table
const VehicleType = sequelize.define(
	'vehicle_type_lookup',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true
		},
		vehicle_type: {
			type: Sequelize.STRING(45),
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

module.exports = VehicleType;
