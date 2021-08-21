const db = require('../db/index')
const sendResponse = require('../lib/create-error')

/**
 * Función para verificar si existe el producto en el kardex con el número de orden especifico.
 * @param {string} NOrder - El número de la orden que queremos verificar.
 * @param {object} items -  El item que deseamos buscar en el kardex.
 * @returns {object} Devuelve un objecto de respuesta.
 */
const verifyProductInKardex = async (NOrder, items) => {
  const query = `
    SELECT count(items) AS count 
    FROM Kardex WHERE n_order = ? 
    AND items = ? GROUP BY items`
  const placeholder = [NOrder, items]

  const [result] = await db.query(query, placeholder)
  const sendRes = await sendResponse({ body: result })
  return sendRes
}

module.exports = verifyProductInKardex
