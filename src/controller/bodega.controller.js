const db = require('../db/index')
const sendResponse = require('../lib/create-error')

/**
 *Guarda la información de una factura sentada en el registro.
 * @param {object} req - Obtenemos los parametros de la factura a sentar.
 *
 */
const saveDetailsInvoice = async (req, res) => {
  const detailsInvoice = req.body
  const query = 'INSERT INTO Bodega SET ?'

  await db
    .query(query, detailsInvoice)
    .then((result) => res.json(sendResponse({ body: result[0] })))
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

/**
 *Obtenemos la información de una factura sentada con su número.
 * @param {*} req
 * @returns - Objeto con la información de la factura.
 */
const getDetailsInvoice = async (req, res) => {
  const query = 'SELECT * FROM Bodega WHERE n_factura = ?'
  const placeholder = [req.params.factura]

  await db.query(query, placeholder)
    .then((result) => {
      if (Array.isArray(result[0]) && !result[0].length) res.status(404).json(sendResponse('404'))
      else res.json(sendResponse({ body: result[0] }))
    })
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

/**
 *Obtenemos todos los números de factura de manera descendente, solo los ultimos 50 registros.
 * @param {*} req
 * @param {*} res
 */
const getAllNFacturas = async (req, res) => {
  const query = 'SELECT n_factura FROM Bodega ORDER BY n_factura DESC LIMIT 50'
  await db.query(query)
    .then((result) => {
      if (Array.isArray(result[0]) && !result[0].length) res.status(404).json(sendResponse('404'))
      else res.json(sendResponse({ body: result[0] }))
    })
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

const updateInvoiceById = async (req, res) => {
  const placeholder = [req.params.id]
  console.log(req.params.id)

  const invoiceInfoToUpdate = req.body
  const keyInvoiceFields = Object.keys(invoiceInfoToUpdate)
  const valuesInvoiceFields = Object.values(invoiceInfoToUpdate)

  valuesInvoiceFields.push(placeholder[0])
  const element = keyInvoiceFields.reduce((acc, el) => {
    acc += el + ' = ?, '
    return acc
  }, '')

  const fields = element.slice(0, -2)

  const query = `UPDATE Bodega SET ${fields} WHERE id = ?`
  await db
    .query(query, valuesInvoiceFields)
    .then((result) => res.json(sendResponse({ body: result[0] })))
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

const AllInvoicesNumbers = async (req, res) => {
  const query = 'SELECT n_factura FROM Bodega ORDER BY n_factura DESC LIMIT 50'

  await db.query(query)
    .then((result) => {
      res.json(sendResponse({ body: result[0] }))
    })
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

module.exports = {
  saveDetailsInvoice,
  getDetailsInvoice,
  getAllNFacturas,
  updateInvoiceById,
  AllInvoicesNumbers
}
