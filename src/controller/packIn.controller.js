const db = require('../db/index')
const sendResponse = require('../lib/create-error')

/**
 * Devuelve todos los nombres de las personas que empacan los pedidos de manera ascendente.
 */
const allPackInName = async (req, res) => {
  const query = 'SELECT id, nombre_completo FROM PackIn ORDER BY nombre_completo ASC'

  await db
    .query(query)
    .then((result) => res.json(sendResponse({ body: result[0] })))
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

/**
 *Borrar un usuario de la tabla CheckIn dado un :ID
 * @param {string} req - El id requerido para realizar la solicitud.
 * @returns Si se realizó la operación retornará "affectedRows" sino un NetworkError.
 */
const deletePackInName = async (req, res) => {
  const placeholder = [req.params.id]
  const query = 'DELETE FROM PackIn WHERE id = ?'

  await db
    .query(query, placeholder)
    .then((result) => {
      if (!result[0].affectedRows) res.status(404).json(sendResponse('404'))
      else res.json(sendResponse({ body: result[0] }))
    })
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

/**
 *Adiciona un usuario de la tabla CheckIn.
 * @param {string} req -Nombre del usuario a registrar.
 * @returns Si se realizó la operación retornará "affectedRows" sino un NetworkError.
 */
const addPackInName = async (req, res) => {
  const { nombre_completo: nombreCompleto } = req.body
  const query = `INSERT INTO PackIn (nombre_completo) VALUES ("${nombreCompleto}")`

  await db
    .query(query)
    .then((result) => res.json(sendResponse({ body: result[0] })))
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

module.exports = {
  allPackInName,
  addPackInName,
  deletePackInName
}
