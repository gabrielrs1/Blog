const sequelize = require("sequelize")
const connection = require("../database/db")

const User = connection.define("users", {
    email: {
        type: sequelize.STRING,
        allowNull: false
    }, password: {
        type: sequelize.STRING,
        allowNull: false
    }
})

// User.sync({force: false}) // force: false, se não tiver a tabela criada, ele cria a tabela 1 vez só. Force: true, ele sempre vai ficar recriando a tabela
// Quando criar a tabela já pode apagar este comando

module.exports = User