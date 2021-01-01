const express = require("express")
const router = express.Router()
const Category = require("./Category") // model
const slugify = require("slugify") // tranforma uma string em slug: Ola Mundo para Ola-Mundo, coloca aquele traço no lugar dos espaços

router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new")
})

// salvando categoria
router.post("/categories/save", (req, res) => {
    var title = req.body.title
    if(title != undefined) {
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => {
            res.redirect("/admin/categories")
        })
    } else {
        res.redirect("/admin/categories/new")
    }
})

// adicionando categorias na tela
router.get("/admin/categories", (req, res) => {
    Category.findAll().then(categories => { // pegando dados do database
        res.render("admin/categories/index", {categories: categories})  
    })
})

// deletando a categoria
router.post("/categories/delete", (req, res) => {
    var id = req.body.id
    if(id != undefined) {
        if(!isNaN(id)) {
            Category.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/categories")
            })
        } else {
            res.redirect("/admin/categories")
        }
    } else {
        res.redirect("/admin/categories")
    }
})

// editando a categoria
router.get("/admin/categories/edit/:id", (req, res) => {
    var id = req.params.id
    if(isNaN(id)) { // verifica se o id passado tem alguma string junto
        res.redirect("/admin/categories")
    }
    // findbypk pesquisa pelo id
    Category.findByPk(id).then(category => {
        if(category != undefined) {
            res.render("admin/categories/edit", {category: category})
        } else {
            res.redirect("/admin/categories")
        }
    }).catch(error => {
        res.redirect("/admin/categories")
    })
})

router.post("/categories/update", (req, res) => {
    var id = req.body.id
    var title = req.body.title

    Category.update({ title: title, slug: slugify(title) }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/categories")
    })
})

module.exports = router