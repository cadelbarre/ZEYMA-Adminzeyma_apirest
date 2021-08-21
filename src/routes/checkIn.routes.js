const express = require('express')
const router = express.Router()

const { allCheckInName, deleteCheckInName, addCheckInName } = require('../controller/checkIn.controller')

router.get('/api/checkInNames', allCheckInName)
router.post('/api/checkInNames/', addCheckInName)
router.delete('/api/checkInNames/:id', deleteCheckInName)

module.exports = router
