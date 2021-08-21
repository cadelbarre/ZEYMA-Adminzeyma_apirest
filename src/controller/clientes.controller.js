const db = require('../db/index')
const sendResponse = require('../lib/create-error')

/**
 * Obtenemos toda la lista de clientes de manera ascendente teniendo en cuenta el nombre de la drogueria.
 * @returns {object} Devuelve un objecto de respuesta, caso contrario devolverá un error 404 (Cliente no existe en la base de datos.)
 */
const allClients = async (req, res) => {
  const query = 'SELECT codigo, nombre_drogueria, zona, cupo, dias_credito, lista_precio  FROM ListadoClientes WHERE nombre_drogueria NOT IN ("") ORDER BY nombre_drogueria ASC'

  await db.query(query)
    .then((result) => {
      if (Array.isArray(result[0]) && !result[0].length) res.status(404).json(sendResponse('ClientDoesntExist'))
      else res.json(sendResponse({ body: result[0] }))
    })
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

/**
 * Buscamos todos los clientes de un vendedor en especifico dada su zona como parametro.
 * @param {request} req - Obtenemos la zona del vendedor a través del req.params
 * @returns {object} Devuelve un objecto de respuesta, caso contrario devolverá un error 404 (Cliente no existe en la base de datos.)
 */
const clientsBySeller = async (req, res) => {
  const query =
    'SELECT codigo, nombre_drogueria, zona, cupo, dias_credito, lista_precio FROM ListadoClientes WHERE zona = ? AND nombre_drogueria NOT IN ("")  ORDER BY nombre_drogueria ASC'
  const placeholder = [req.params.zona]
  if (placeholder[0].length === 1) placeholder[0] = '0' + placeholder[0]

  await db.query(query, placeholder)
    .then((result) => {
      if (Array.isArray(result[0]) && !result[0].length) res.status(404).json(sendResponse('ClientDoesntExist'))
      else res.json(sendResponse({ body: result[0] }))
    })
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

/**
 * Contatenamos el codigo del cliente, el nombre de la drogueria y el nombre del contacto de todos los clientes por zona.
 * @param {string} req -  Obtenemos la zona del vendedor a través del req.params
 * @return {object}  Devuelve un objecto de respuesta, caso contrario devolverá un error 404 (Cliente no existe en la base de datos.)
 */
const nameOfAllClients = async (req, res) => {
  const query =
    "SELECT codigo, CONCAT(codigo,' - ', TRIM(nombre_drogueria), ' - ', TRIM(contacto)) AS nombre_completo, cupo, dias_credito, lista_precio FROM ListadoClientes WHERE codigo <> '' ORDER BY nombre_drogueria ASC"

  await db.query(query)
    .then((result) => {
      if (Array.isArray(result[0]) && !result[0].length) res.status(404).json(sendResponse('ClientDoesntExist'))
      else res.json(sendResponse({ body: result[0] }))
    })
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

/**
 *Buscamos todos los datos de un cliente especifico en la tabla clientes.
 * @param {request} req - Obtenemos el codigo del cliente a través del req.params
 * @returns {object} Devuelve un objecto de respuesta, caso contrario devolverá un error 404 (Cliente no existe en la base de datos.)
 */
const searchClientsByCode = async (req, res) => {
  const query = 'SELECT * FROM ListadoClientes WHERE codigo = ?'
  const placeholder = [req.params.codigo]

  await db.query(query, placeholder)
    .then((result) => {
      if (Array.isArray(result[0]) && !result[0].length) res.status(404).json(sendResponse('ClientDoesntExist'))
      else res.json(sendResponse({ body: result[0] }))
    })
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

module.exports = {
  allClients,
  clientsBySeller,
  nameOfAllClients,
  searchClientsByCode
}
