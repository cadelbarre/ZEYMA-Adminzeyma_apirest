const express = require('express')
const router = express.Router()

const { driversNames, carsNames, saveHeader, getMaxNDespacho, saveRoute, getRouteByDespacho, getHeaderRoute } = require('../controller/logistica.controller')

router.get('/api/logistica/conductor', driversNames)
router.get('/api/logistica/automotor', carsNames)
router.get('/api/logistica/maxDespacho', getMaxNDespacho)
router.get('/api/despacho/:ruta', getHeaderRoute)
router.get('/api/logistica/:ruta', getRouteByDespacho)

router.post('/api/logistica/despacho', saveHeader)
router.post('/api/logistica/rutaDespacho', saveRoute)

module.exports = router
