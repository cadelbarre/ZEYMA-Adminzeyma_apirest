const express = require('express')
const router = express.Router()

const {
  clientsBySeller,
  allClients,
  nameOfAllClients,
  searchClientsByCode
} = require('../controller/clientes.controller')

// CLIENTES
router.get('/api/clientes', allClients)
router.get('/api/clientes/:zona', clientsBySeller)
router.get('/api/cliente/:codigo', searchClientsByCode)
router.get('/api/nombresClientes', nameOfAllClients)

module.exports = router
