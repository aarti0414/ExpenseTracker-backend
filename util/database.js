const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense-tracker','root','testroot',{
    dialect : 'mysql',
    host : 'localhost'
})

module.exports=sequelize;