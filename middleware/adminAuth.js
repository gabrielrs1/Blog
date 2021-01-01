// Middleware faz a intermediação das requisições e respostas do servidor verificando se o usuário que está navegando possui o login

function adminAuth(req, res, next) {
    if(req.session.user != undefined) {
        next()
    } else {
        res.redirect("/login")
    }
}

module.exports = adminAuth