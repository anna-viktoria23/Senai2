const express = require('express')
const router = express.router

const ProdutoController = require('../controllers/produtoController')
router.get('/', ProdutoController.listar)
router.get('/:id', ProdutoController.buscarPorId )
router.post('/', ProdutoController.cadastrar)
router.put('/:id', ProdutoController.atualizar)
router.delete('/:id', ProdutoController.excluir)

//passa por essa lista e identifica o que está sendo pedido lá no app, ex: get /produto/5 -> produto com id.