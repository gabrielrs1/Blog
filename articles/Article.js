const sequelize = require("sequelize")
const connection = require("../database/db")

// model da categoria
const Category = require("../categories/Category")

const Article = connection.define("articles", {
    title: {
        type: sequelize.STRING,
        allowNull: false
    }, slug: {
        type: sequelize.STRING,
        allowNull: false
    },
    body: {
        type: sequelize.TEXT,
        allowNull: false
    }
})

Category.hasMany(Article) // Uma categoria tem muitos artigos - 1 para Muitos
Article.belongsTo(Category) // Um artigo pertence a uma categoria - 1 para 1

module.exports = Article