const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('toughts', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})
try {
    sequelize.authenticate()
    console.log("Conectado com sequelize!");
} catch (error) {
    console.log(error);
}

module.exports = sequelize