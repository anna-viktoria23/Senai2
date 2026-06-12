//analisa qual dominio vai ser passado
const express = require('express')
const router = express.Router()

const produtoRoutes = require('./produtoRoutes')

router.get('/', (req, res) => {
    res.json({
        mensagem: "API SaborDigital",
        versao:"1.0",
        arquitetura: "MVC + SOLID"
    })
})

//chama o produto routes
router.use('/produtos', produtoRoutes) //se vem em barra normal, vai pro de cima. se vem com produtos, vai para esse 