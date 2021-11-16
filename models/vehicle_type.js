const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

//To Test DB Connection
// sequelize
// 	.authenticate()
// 	.then(() => console.log('Database connected...'))
// 	.catch((err) => console.log(`Error: ${err}`));

// sequelize model for vehicle_type table
const VehicleType = sequelize.define(
	'vehicle_type_lookup',
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement:true,
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



	// VehicleType.associate = function (models) {
	// 	VehicleType.belongsTo(models.dealers, { 
	// 	  foreignKey: 'dealer_id', 
	// 	  as: 'dealers' 
	// 	});
	//   };

// VehicleType.sync({force:true}).then(() => {
//     console.log('table created');
//   });

module.exports = VehicleType;
