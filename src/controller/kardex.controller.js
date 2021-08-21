const db = require('../db/index')
const sendResponse = require('../lib/create-error')
const { verifyProductInKardex } = require('../functions/kardex')

/** Insertamos la información principal de una order de pedido.
 * @param {Request} req - Recibimos el objecto que vamos a ingresar en la base de datos.
 * @returns {object} Devuelve la un objecto con la respuesta del INSERT INTO.
 */
const saveOrderIntoMaestroOrder = async (req, res) => {
  const query = 'INSERT INTO MaestroOrder SET ?'
  const orderData = req.body

  await db.query(query, orderData)
    .then((result) => res.json(sendResponse({ body: result[0] })))
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

/**
 * Insertamos un producto con su respectiva información de precio, cantidad, número de orden en el kardex
 * @param {Request} req - Recibimos en número de orden y la información del item.
 *  @returns {object} Devuelve la un objecto con la respuesta del INSERT INTO.
 */
const saveOrderIntoKardex = async (req, res) => {
  const { n_order: NOrder, items } = req.body
  const { body } = await verifyProductInKardex(NOrder, items)
  if (body.length > 0) return res.json(sendResponse('itemsExist'))

  const query = 'INSERT INTO Kardex SET ?'

  const orderData = req.body
  await db.query(query, orderData)
    .then((result) => res.json(sendResponse({ body: result[0] })))
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

/**
 * Obtener el valor total de la orden actual
 * @param {Request} req - Obtenemos el número de orden a través del req.params.
 * @returns {array} Array de todos los productos de un número de orden especifico..
 */
const getTotalByOrder = async (req, res) => {
  const query = `
  SELECT sum(valor_total) AS valor_total FROM Kardex 
  WHERE n_order = ? GROUP BY n_order`

  const { n_order: NOrder } = req.params

  await db.query(query, NOrder)
    .then((result) => {
      if (Array.isArray(result[0]) && !result[0].length) res.status(404).json(sendResponse('NOrderDoesntExist'))
      else res.json(sendResponse({ body: result[0] }))
    })
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

/**
 * Obtenemos la información de MaestroOrder dado un número de orden.
 * @returns {object} Devuelve un objecto de respuesta.
 */
const getDataByNOrder = async (req, res) => {
  const query = `
  SELECT * FROM Kardex WHERE n_order = ?`

  const { n_order: NOrder } = req.params

  await db.query(query, NOrder)
    .then((result) => {
      if (Array.isArray(result[0]) && !result[0].length) res.status(404).json(sendResponse('NOrderDoesntExist'))
      else res.json(sendResponse({ body: result[0] }))
    })
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

/**
 * Borramos todos los resgistros en el kardex de un número de orden dado.
 * @returns {object} Devuelve un objecto de respuesta.
 */
const deleteOrderInKardex = async (req, res) => {
  const query = 'DELETE FROM Kardex WHERE n_order = ?'
  const { n_order: NOrder } = req.params

  await db.query(query, NOrder)
    .then((result) => res.json(sendResponse({ body: result[0] })))
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

module.exports = {
  saveOrderIntoMaestroOrder,
  saveOrderIntoKardex,
  getTotalByOrder,
  deleteOrderInKardex,
  getDataByNOrder
}
