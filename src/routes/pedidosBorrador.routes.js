const express = require('express')
const router = express.Router()

const { getDraftOrders, deleteOrderByNOrder } = require('../controller/pedidosBorrador.controller')
const { deleteOrderInKardex } = require('../controller/kardex.controller')

router.get('/api/pedidosBorrador', getDraftOrders)
router.delete(
  '/api/pedidosBorrador/:n_order',
  deleteOrderByNOrder,
  deleteOrderInKardex
)

module.exports = router
