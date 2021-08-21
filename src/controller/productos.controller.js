const db = require('../db/index')
const sendResponse = require('../lib/create-error')

const arrayListOfPrices = [
  'precio_uno',
  'precio_dos',
  'precio_tres',
  'precio_cuatro',
  'precio_cinco',
  'precio_seis',
  'precio_siete'
]

/**
 * Devuelve el listado de productos para un cliente dado, teniendo en cuenta la lista que se le fue asignada.
 * @param {request} req - Obtenemos número del listado de precio del cliente a través del req.params
 * @returns Devuelve un objecto de respuesta, caso contrario devolverá un error 404 (Cliente no existe en la base de datos.)
 */
const getListOfProducts = async (req, res) => {
  const { lista_precio: listaPrecios } = req.params
  const price = await arrayListOfPrices[listaPrecios - 1]

  const query = `
    SELECT codigo, nombre_producto, ${price} AS precio, descuento, iva, nit_proveedor, stock 
    FROM ListadoProductos`

  await db.query(query)
    .then((result) => {
      if (Array.isArray(result[0]) && !result[0].length) res.status(404).json(sendResponse.error('La tabla ListadoProductos no se encuentra en la base de datos.'))
      else res.json(sendResponse({ body: result[0] }))
    })
    .catch((e) => res.status(500).json(sendResponse({ body: e, error: true, status: 500 })))
}

module.exports = {
  getListOfProducts
}
