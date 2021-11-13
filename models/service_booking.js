const Sequelize  = require('sequelize');
const db = require('../utils/database');
const VehicleType = require('./vehicle_type');
const Customer = require('./customerModel');
const dealerModel = require('./dealerModel');
const statusModel = require('./service_status');
const dealerServiceModel = require('./dealer_serviceModel');



const  serviceBookingModel = db.define("service_booking",{
    id:{
        type:Sequelize.BIGINT,
        autoIncrement:true,
        primaryKey: true
    },
    refrence_id:{
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    vehicle_reg_no :{
        type:Sequelize.STRING
    },
    vehicle_model :{
        type:Sequelize.STRING
    },
    pick_up :{
        type:Sequelize.BOOLEAN
    },
    pick_up_date :{
        type:Sequelize.DATEONLY
    },
    drop_date :{
        type:Sequelize.DATEONLY
    },
    customer_id :{
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {        
          model: Customer,
          key: 'customer_id'
        }
    },
    dealer_id :{
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {        
          model: dealerModel,
          key: 'dealer_id'
        }
    },
    service_id :{
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {        
          model: dealerServiceModel,
          key: 'service_id'
        }
    },
    status_id :{
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {        
          model: statusModel,
          key: 'status_id'
        }
    },
    vehicle_type_id :{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {        
          model: VehicleType,
          key: VehicleType.id
        }
    }
    
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'modified_at',
    freezeTableName: true,
});

serviceBookingModel.associate = function() {
    serviceBookingModel.belongsTo(Customer, {foreignKey: 'customer_id', as: 'Customer'})
};

serviceBookingModel.associate = function() {
    serviceBookingModel.belongsTo(dealerModel, {foreignKey: 'dealer_id', as: 'Dealer'})
};
serviceBookingModel.associate = function() {
    serviceBookingModel.belongsTo(dealerServiceModel, {foreignKey: 'service_id', as: 'dealerService'})
};
serviceBookingModel.associate = function() {
    serviceBookingModel.belongsTo(statusModel, {foreignKey: 'status_id', as: 'status'})
};

serviceBookingModel.associate = function() {
    serviceBookingModel.belongsTo(VehicleType, {foreignKey: 'vehicle_type_id', as: 'Vehicletype'})
};

// serviceBookingModel.sync({force:true}).then(() => {
//     console.log('table created');
//   });

module.exports =serviceBookingModel;

