const db = require('../db/index')
const sendResponse = require('../lib/create-error')

/**
 * Obtenemos todos los pedidos que se encuentren en estado borrador.
 */
const getDraftOrders = async (req, res) => {
  const query = `
    SELECT MaestroOrder.n_order, codigo, nombre_completo, MaestroOrder.fecha, MaestroOrder.hora, MaestroOrder.nombre_usuario,  sum(Kardex.valor_total) AS valor_total
    FROM MaestroOrder 
    LEFT JOIN Kardex ON Kardex.n_order = MaestroOrder.n_order
    WHERE estado = 'Borrador' GROUP BY MaestroOrder.n_order ORDER BY n_order DESC LIMIT 50`

  await db.query(query)
    .then((result) => {
      if (Array.isArray(result[0]) && !result[0].length) res.status(404).json(sendResponse('DraftRequestDoesntExist'))
      else res.json(sendResponse({ body: result[0] }))
    })
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

/**
 * Borramos de la tabla MaestroOrder un numero de pedido.
 * @param {string} req - Obtenemos número de order del pedido  a través del req.params
 * @param {function} next - Continua con la ejecución de la siguiente función.
 */
const deleteOrderByNOrder = async (req, res, next) => {
  const { n_order: NOrder } = req.params
  const query = 'DELETE FROM MaestroOrder WHERE n_order = ?'

  await db.query(query, NOrder)
    .then((result) => {
      if (result[0].affectedRows === 0) res.status(404).json(sendResponse('FileWasnotDeletedInDB'))
      else next()
    })
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

module.exports = {
  deleteOrderByNOrder,
  getDraftOrders
}
