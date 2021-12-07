const Sequelize  = require('sequelize');
const db = require('../utils/database');

const serviceTypes= db.define("service_lookup",{
        id:{
            type:Sequelize.INTEGER,
            primaryKey: true
        },
        service_type:{
            type:Sequelize.STRING
        },
        service_name:{
            type:Sequelize.STRING
        },
        service_image_url:{
            type:Sequelize.STRING
        }
    },{
        timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'modified_at',
		freezeTableName: true
});

//Need for Future purpose

// serviceTypes.sync({alter:true}).then(() => {
//     console.log('table created');
// });

module.exports = serviceTypes;

