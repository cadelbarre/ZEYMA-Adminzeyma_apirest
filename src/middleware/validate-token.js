const sendResponse = require('../lib/create-error')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers.access_token

  if (token) {
    jwt.verify(token, process.env.TOKEN_SIGNATURE, (err, decoded) => {
      if (err) res.json(sendResponse('invalidToken'))
      else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    res.json(sendResponse('tokenNotProvided'))
  }
}
