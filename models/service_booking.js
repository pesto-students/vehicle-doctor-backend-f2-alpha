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
    
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'modified_at',
    freezeTableName: true,
});

    serviceBookingModel.belongsTo(Customer, {foreignKey: 'customer_id', as: 'Customer'})
    Customer.hasOne(serviceBookingModel, {foreignKey: 'customer_id', as: 'Customer'})

    serviceBookingModel.belongsTo(dealerModel, {foreignKey: 'dealer_id', as: 'Dealer'})
    dealerModel.hasOne(serviceBookingModel, {foreignKey: 'dealer_id', as: 'Dealer'})

    serviceBookingModel.belongsTo(dealerServiceModel, {foreignKey: 'service_id', as: 'dealerService'})
    dealerServiceModel.hasOne(serviceBookingModel, {foreignKey: 'service_id', as: 'dealerService'})

    serviceBookingModel.belongsTo(statusModel, {foreignKey: 'status_id', as: 'status'})
    statusModel.hasOne(serviceBookingModel, {foreignKey: 'status_id', as: 'status'})

    serviceBookingModel.belongsTo(VehicleType, {foreignKey: 'vehicle_type_id', as: 'Vehicle_type'})
    VehicleType.hasOne(serviceBookingModel, {foreignKey: 'vehicle_type_id', as: 'Vehicle_type'})


// serviceBookingModel.sync({force:true}).then(() => {
//     console.log('table created');
//   });

module.exports =serviceBookingModel;

