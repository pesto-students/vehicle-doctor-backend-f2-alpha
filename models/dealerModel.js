const Sequelize  = require('sequelize');
const db = require('../utils/database');
const VehicleType = require('./vehicle_type');


const dealerModel= db.define("dealer_tbl",{
    dealer_id:{
        type:Sequelize.BIGINT,
        autoIncrement:true,
        primaryKey: true
    },
    name:{
        type:Sequelize.STRING
    },
    mobile:{
        type:Sequelize.BIGINT
    },
    email:{
        type:Sequelize.STRING
    },
    password:{
        type:Sequelize.STRING
    },
    gst_no:{
        type:Sequelize.STRING
    },
    locality:{
        type:Sequelize.STRING
    },
    city:{
        type:Sequelize.STRING
    },
    state:{
        type:Sequelize.STRING
    },
    pincode:{
        type:Sequelize.BIGINT
    },
    lat:{
        type:Sequelize.DECIMAL
    },
    lng:{
        type:Sequelize.DECIMAL
    }
},{
    timestamps: true,
	createdAt: 'created_at',
	updatedAt: 'modified_at',
    freezeTableName: true,
});


dealerModel.belongsTo(VehicleType, {foreignKey: 'vehicle_type_id', as: 'Vehicletype'})

    
VehicleType.hasOne(dealerModel,{foreignKey:'vehicle_type_id',as:'Vehicletype'})


//Need for Future purpose

// dealerModel.sync({force:true}).then(() => {
//     console.log('table created');
//   });

module.exports = dealerModel;

