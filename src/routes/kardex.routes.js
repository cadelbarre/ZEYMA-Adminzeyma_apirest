const express = require('express')
const router = express.Router()

const {
  saveOrderIntoMaestroOrder,
  saveOrderIntoKardex,
  getTotalByOrder,
  getDataByNOrder
} = require('../controller/kardex.controller')

router.post('/api/guardarNorder', saveOrderIntoMaestroOrder)
router.post('/api/guardarEnKardex', saveOrderIntoKardex)

router.get('/api/totalPedido/:n_order', getTotalByOrder)
router.get('/api/mostrarPedido/:n_order', getDataByNOrder)

module.exports = router
