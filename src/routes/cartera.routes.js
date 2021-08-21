const express = require('express')
const router = express.Router()

const {
  debtByClient,
  allClientsDebts
} = require('../controller/cartera.controller')

router.get('/api/cartera', allClientsDebts)
router.get('/api/cartera/:codigo', debtByClient)

module.exports = router
