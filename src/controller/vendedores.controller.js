const db = require('../db/index')
const sendResponse = require('../lib/create-error')

/**
 * Esta función permite obtener todos los vendedores con su información correspondiente de la base de datos.
 * @returns {object} Si existe los vendedoresr, retornará su información sino un NetworkError.
 */
const allSellers = async (req, res) => {
  const query = `
  SELECT * FROM Vendedores
  WHERE zona NOT IN ('07', '08','09', '10','11', '12', '13', '14', '15', '16')
  AND estado = "Activo"
  ORDER BY zona ASC`

  await db
    .query(query)
    .then((result) => res.json(sendResponse({ body: result[0] })))
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

/**
 * Busca la información de un vendedor teniendo en cuanta la :zona
 * @param {string} req - La zona requerida para realizar la busqueda.
 * @returns {Object} Si existe el vendedor retornará su información sino un NetworkError.
 */
const oneSeller = async (req, res) => {
  const query = 'SELECT * FROM Vendedores WHERE zona = ?'
  const placeholder = [req.params.zona]
  if (placeholder[0].length === 1) placeholder[0] = '0' + placeholder[0]

  await db.query(query, placeholder)
    .then((result) => {
      if (Array.isArray(result[0]) && !result[0].length) res.status(404).json(sendResponse('sellerNotFounded'))
      else res.json(sendResponse({ body: result[0] }))
    })
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

/**
 *Borra un vendedor de la base de datos dado la zona correspondiente.
 * @param {string} req - La zona del vendedor
 *  @returns  Si existe el vendedor retornará su información sino un NetworkError.
 */
const deleteOneSeller = async (req, res) => {
  const placeholder = [req.params.zona]
  if (placeholder[0].length === 1) placeholder[0] = '0' + placeholder[0]
  const query = 'DELETE FROM Vendedores WHERE zona = ?'

  await db
    .query(query, placeholder)
    .then((result) => {
      if (!result[0].affectedRows) res.status(404).json(sendResponse('404'))
      else res.json(sendResponse({ body: result[0] }))
    })
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

/**
 *Adicionar un vendedor de la base de datos dado la zona correspondiente.
 * @param {string} req - La zona del vendedor
 *  @returns  Si existe el vendedor retornará su información sino un NetworkError.
 */
const addOneSeller = async (req, res) => {
  const newSeller = req.body
  const query = 'INSERT INTO Vendedores SET ?'

  await db
    .query(query, newSeller)
    .then((result) => res.json(sendResponse({ body: result[0] })))
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

/**
 *Borra un vendedor de la base de datos dado la zona correspondiente.
 * @param {string} req - La zona del vendedor
 *  @returns  Si existe el vendedor retornará su información sino un NetworkError.
 */
const updateOneSeller = async (req, res) => {
  const placeholder = [req.params.zona]
  if (placeholder[0].length === 1) placeholder[0] = '0' + placeholder[0]

  const sellerInfoToUpdate = req.body
  const keySellerFields = Object.keys(sellerInfoToUpdate)
  const valuesSellerFields = Object.values(sellerInfoToUpdate)

  valuesSellerFields.push(placeholder[0])
  const element = keySellerFields.reduce((acc, el) => {
    acc += el + ' = ?, '
    return acc
  }, '')

  const fields = element.slice(0, -2)
  const query = `UPDATE Vendedores SET ${fields} WHERE zona = ?`

  await db
    .query(query, valuesSellerFields)
    .then((result) => res.json(sendResponse({ body: result[0] })))
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

module.exports = {
  allSellers,
  oneSeller,
  deleteOneSeller,
  addOneSeller,
  updateOneSeller
}
