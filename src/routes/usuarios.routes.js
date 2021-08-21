const express = require('express')
const router = express.Router()

const { authentication } = require('../controller/usuarios.controller')

router.get('/api/authentication/:username&:password', authentication)

module.exports = router
