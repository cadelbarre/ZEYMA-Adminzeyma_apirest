const db = require('../db/index')
const sendResponse = require('../lib/create-error')

const driversNames = async (req, res) => {
  const query = 'SELECT conductor FROM Conductores'

  await db
    .query(query)
    .then((result) => res.json(sendResponse({ body: result[0] })))
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

const carsNames = async (req, res) => {
  const query = 'SELECT automotor FROM Automotores'

  await db
    .query(query)
    .then((result) => res.json(sendResponse({ body: result[0] })))
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

const getMaxNDespacho = async (req, res) => {
  const query = 'SELECT MAX(n_despacho) AS maxDespacho FROM Despacho'

  await db
    .query(query)
    .then((result) => res.json(sendResponse({ body: result[0] })))
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

const getRouteByDespacho = async (req, res) => {
  const { ruta } = req.params
  const query = `SELECT * FROM  Bodega WHERE n_factura IN (SELECT n_factura FROM DespachoKardex WHERE DespachoKardex.n_despacho = ${ruta} );`

  await db
    .query(query)
    .then((result) => res.json(sendResponse({ body: result[0] })))
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

const getHeaderRoute = async (req, res) => {
  const { ruta } = req.params
  const query = `SELECT * FROM Despacho WHERE n_despacho = ${ruta};`

  await db
    .query(query)
    .then((result) => res.json(sendResponse({ body: result[0] })))
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

const saveHeader = async (req, res) => {
  const query = 'INSERT INTO Despacho SET ?'
  const orderData = req.body

  await db.query(query, orderData)
    .then((result) => res.json(sendResponse({ body: result[0] })))
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

const saveRoute = async (req, res) => {
  const query = 'INSERT INTO DespachoKardex SET ?'
  const orderData = req.body

  await db.query(query, orderData)
    .then((result) => res.json(sendResponse({ body: result[0] })))
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

module.exports = {
  driversNames,
  carsNames,
  saveHeader,
  saveRoute,
  getMaxNDespacho,
  getRouteByDespacho,
  getHeaderRoute
}
