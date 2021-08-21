const express = require('express')
const router = express.Router()

const {
  allSellers,
  oneSeller,
  deleteOneSeller,
  addOneSeller,
  updateOneSeller
} = require('../controller/vendedores.controller')

router.get('/api/vendedores', allSellers)
router.get('/api/vendedores/:zona', oneSeller)
router.delete('/api/vendedores/:zona', deleteOneSeller)
router.post('/api/vendedores', addOneSeller)
router.post('/api/vendedores/:zona', updateOneSeller)

module.exports = router
