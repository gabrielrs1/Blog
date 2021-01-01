const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const session = require("express-session")
const connection = require("./database/db")

const categoriesController = require("./categories/CategoriesController")
const articlesController = require("./articles/ArticlesController")
const usersController = require("./users/UsersController")

const Article = require("./articles/Article")
const Category = require("./categories/Category")
const User = require("./users/User")

// View engine
app.set("view engine", "ejs")

// Sessions
app.use(session({
    secret: "qualquer",
    cookie: {maxAge: 3000000}
}))

// Static files
app.use(express.static("public"))

// Body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Database
connection
    .authenticate()
    .then(() => {
        console.log("Database Ok!")
    })
    .catch((error) => {
        console.log(error)
    })

app.use("/", categoriesController)
app.use("/", articlesController)
app.use("/", usersController)

// Teste de Sessões
// app.get("/session", (req, res) => {
//     req.session.treinamento = "paranaue"
//     req.session.todo = "todo"
//     req.session.pessoa = {
//         username: "nome",
//         idade: 145
//     }
//     res.send("Sessao")
// })

// app.get("/leitura", (req, res) => {
//     res.json({
//         treino: req.session.treinamento,
//         perrso: req.session.pessoa
//     })
// })

app.get("/", (req, res) => {
    Article.findAll({
        order: [
            ["id", "DESC"]
        ],
        limit: 4 // limita a visualizacao dos item
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("index", {articles: articles, categories: categories})
        })
    })
})

app.get("/:slug", (req, res) => {
    var slug = req.params.slug
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined) {
            Category.findAll().then(categories => {
                res.render("article", {article: article, categories: categories})
            })
        } else {
            res.redirect("/")
        }
    }).catch(error => {
        res.redirect("/")
    })
})

app.get("/category/:slug", (req, res) => {
    var slug = req.params.slug
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{model: Article}] // incluindo a busca da categoria tbm junto com o article para um array
    }).then(category => {
        if(category != undefined) {
            Category.findAll().then(categories => {
                res.render("index", {articles: category.articles, categories: categories})
            })
        } else {
            res.redirect("/")
        }
    })
})

app.listen(3000)