const db = require('../db/index')
const sendResponse = require('../lib/create-error')

/**
 * Obtener toda la cartera actual activa de todos los clientes.
 */
const allClientsDebts = async (req, res) => {
  const query = 'SELECT * FROM MaestroFacturas'
  await db
    .query(query)
    .then((result) => res.json(sendResponse({ body: result[0] })))
    .catch((e) => sendResponse('NetworkError'))
}

/**
 * Obtenemos la cartera de un clientes especifico.
 * @param {string} req - Obtenemos el codigo del cliente a través del req.params
 * @returns Devuelve un objecto de respuesta, caso contrario devolverá un mensaje (Cliente no tiene cartera en la base de datos.)
 */
const debtByClient = async (req, res) => {
  const query = 'SELECT * FROM MaestroFacturas WHERE codigo_cliente = ?'
  console.log(req.params)
  const placeholder = [req.params.codigo]

  await db.query(query, placeholder)
    .then((result) => {
      if (Array.isArray(result[0]) && !result[0].length) res.status(404).json(sendResponse('ClientDoesntHaveDebts'))
      else res.json(sendResponse({ body: result[0] }))
    })
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

module.exports = {
  debtByClient,
  allClientsDebts
}
