const Sequelize  = require('sequelize');
const db = require('../utils/database');

const serviceStatus= db.define("service_status_lookup",{
    status_id:{
        type:Sequelize.BIGINT,
        primaryKey: true
    },
    status_name:{
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

module.exports = serviceStatus;

