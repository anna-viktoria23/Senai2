const express = require('express');
const router = express.Router();

const movimentacaoestoqueController = require('../controllers/MovimentacaoEstoqueController');


router.get('/', movimentacaoestoqueController.listar);
router.get('/:id', movimentacaoestoqueController.buscarPorId);
router.post('/', movimentacaoestoqueController.cadastrar);
router.put('/:id', movimentacaoestoqueController.atualizar);
router.delete('/:id', movimentacaoestoqueController.deletar);

module.exports = router;