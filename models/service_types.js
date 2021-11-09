const Sequelize  = require('sequelize');
const db = require('../utils/database');

const serviceTypes= db.define("service_lookup",{
    id:{
        type:Sequelize.BIGINT,
        primaryKey: true
    },
    service_type:{
        type:Sequelize.STRING
    },
    service_name:{
        type:Sequelize.STRING
    },
    created_at:{
        type:Sequelize.DATE
    },
    modified_at:{
        type:Sequelize.DATE
    }
},{
    createdAt: false,   
    updatedAt: false,
    freezeTableName: true,
});

module.exports = serviceTypes;

