const express = require('express')
const router = express.Router()

const { getListOfProducts } = require('../controller/productos.controller')

router.get('/api/productos/:lista_precio', getListOfProducts)

module.exports = router
