const auth = require('./_auth')
const sellers = require('./_sellers')
const kardex = require('./_kardex')
const clientes = require('./_clientes')
const cartera = require('./_cartera')

function sendResponse (e) {
  return auth[e] ||
         sellers[e] ||
         kardex[e] ||
         clientes[e] ||
         cartera[e] ||
         commonError[e] ||
         commonError.default(e)
}

// colocamos las opciones de los posibles errores con un objecto
const commonError = {
  itemsExist: {
    error: true,
    status: 401,
    body: {
      title: 'INGRESO_FALLIDO',
      message: 'Producto ya existe en la base de datos.'
    }
  },
  DraftRequestDoesntExist: {
    error: true,
    status: 404,
    body: {
      title: 'ERROR_BUSQUEDA',
      message: 'No existe ningún pedido borrador en la Base de Datos'
    }
  },
  FileWasnotDeletedInDB: {
    error: true,
    status: 404,
    body: {
      title: 'ERROR_BORRAR_PEDIDO',
      message: 'El numero del pedido no existe en la base de datos.'
    }
  },
  NetworkError: {
    error: true,
    status: 401,
    body: {
      title: 'ERROR_DE_CONEXIÓN',
      message: 'Hemos tenido un problema al intentar realizar tu solicitud.'
    }
  },
  404: {
    error: true,
    status: 404,
    body: {
      title: 'ACCESO_FALLIDO',
      message: 'No podemos encontrar la información que estas buscando.'
    }
  },
  default: ({ body = {}, status = 200, error = false }) => {
    return {
      status,
      error,
      body
    }
  }
}

module.exports = sendResponse
