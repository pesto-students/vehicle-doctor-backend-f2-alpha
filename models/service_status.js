const Sequelize  = require('sequelize');
const db = require('../utils/database');

const serviceStatus= db.define("service_status_lookup",{
    status_id:{
        type:Sequelize.BIGINT,
        autoIncrement:true,
        primaryKey: true
    },
    status_name:{
        type:Sequelize.STRING
    }
   
},{
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'modified_at',
    freezeTableName: true,
});

// serviceStatus.sync({force:true}).then(() => {
//         console.log('table created');
//       });
    


module.exports = serviceStatus;

