// const express = require('express');
// const router = express.Router();
// const ProdutoController = require('../controllers/ProdutoController');

// router.get('/', ProdutoController.listar);
// router.get('/:id', ProdutoController.buscarPorId);
// router.post('/', ProdutoController.cadastrar);
// router.put('/:id', ProdutoController.atualizar);
// router.delete('/:id', ProdutoController.deletar);

// module.exports = router;

//codigo Celso com Imagem:
// const express = require('express');
// const router = express.Router();
// const ProdutoController = require('../controllers/ProdutoController');
// const upload = require('../config/multer');

// router.get('/', ProdutoController.listar);
// router.get('/:id', ProdutoController.buscarPorId);
// router.post('/', upload.single('imagem'), ProdutoController.cadastrar);
// router.put('/:id', upload.single('imagem'), ProdutoController.atualizar);
// router.delete('/:id', ProdutoController.deletar);

// module.exports = router;

//codigo celso jwt:

const express = require('express');
const router = express.Router();
const ProdutoController = require('../controllers/ProdutoController');
const upload = require('../config/multer');
const { verificarToken, verificarAdmin } = require('../middlewares/authMiddleware');

router.get('/', ProdutoController.listar);
router.get('/:id', ProdutoController.buscarPorId);
router.post('/', verificarToken, verificarAdmin, upload.single('imagem'), ProdutoController.cadastrar);
router.put('/:id', verificarToken, verificarAdmin, upload.single('imagem'), ProdutoController.atualizar);
router.delete('/:id', verificarToken, verificarAdmin, ProdutoController.deletar);

module.exports = router;