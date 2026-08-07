const express = require('express');
const router = express.Router();

const CadastrofornecedoresController = require('../controllers/CadastroFornecedoresController');

router.get('/', CadastrofornecedoresController.listar);
router.get('/:id', CadastrofornecedoresController.buscarPorId);
router.post('/', CadastrofornecedoresController.cadastrar);
router.put('/:id', CadastrofornecedoresController.atualizar);
router.delete('/:id', CadastrofornecedoresController.deletar);

module.exports = router;