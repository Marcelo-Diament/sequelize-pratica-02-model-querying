const express = require('express'),
  router = express.Router(),
  usersController = require('../controllers/users'),
  productsController = require('../controllers/products'),
  acessoController = require('../controllers/acesso'),
  adminMiddleware = require('../middlewares/admin')

// ROTAS ADMINISTRATIVAS (REQUEREM QUE O USUÁRIO AUTENTICADO SEJA ADMIN)
router.get('/usuarios', adminMiddleware, usersController.list) // Tabela de usuários
router.get('/usuarios/:id/editar', adminMiddleware, acessoController.update) // Dados do usuário para edição
router.get('/usuarios/:id/excluir', adminMiddleware, acessoController.delete) // Dados do usuário para edição
router.get('/produtos', adminMiddleware, productsController.list) // Tabela de produtos
// router.get('/produtos/:id/editar', adminMiddleware, acessoController.update) // Dados do produto para edição

module.exports = router
