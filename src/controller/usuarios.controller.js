const sendResponse = require('../lib/create-error')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { searchUserData, searchHash } = require('../functions/usuarios')

const authentication = async (req, res) => {
  const { username, password } = req.params
  const resp = await searchHash(username, password)

  if (resp.error) return res.json(resp) // Validamos si el user existe

  const {
    body: { password: hash }
  } = resp

  const isMatched = await bcrypt.compare(password, hash)
  if (!isMatched) return res.json(sendResponse('authenticationError'))

  const response = await searchUserData(username, hash)
  const payload = { ...response[0] }
  const token = jwt.sign(payload, process.env.TOKEN_SIGNATURE, {
    expiresIn: 60 * 60 * 24
  })

  return res.json(sendResponse({ body: token }))
}

module.exports = {
  authentication
}
