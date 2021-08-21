const express = require('express')
const router = express.Router()

const { allPackInName, addPackInName, deletePackInName } = require('../controller/packIn.controller')

router.get('/api/packInNames', allPackInName)
router.post('/api/packInNames', addPackInName)
router.delete('/api/packInNames/:id', deletePackInName)

module.exports = router
