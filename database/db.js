const { Sequelize } = require("sequelize")
const sequelize = require("sequelize")
const connection = new Sequelize("blog", "root", "zasdw", {
    host: "localhost",
    dialect: "mysql",
    timezone: "-03:00"
})

module.exports = connection