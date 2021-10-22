const express = require('express')
const router = express.Router()

const { saveDetailsInvoice, getDetailsInvoice, getAllNFacturas, updateInvoiceById, AllInvoicesNumbers } = require('../controller/bodega.controller')

router.get('/api/bodega/todasfacturas', AllInvoicesNumbers)
router.get('/api/bodega/nfactura', getAllNFacturas)
router.get('/api/bodega/:factura', getDetailsInvoice)

router.post('/api/bodega', saveDetailsInvoice)
router.post('/api/bodega/:id', updateInvoiceById)

module.exports = router
