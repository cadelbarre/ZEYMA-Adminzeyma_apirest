const kardex = {
  NOrderDoesntExist: {
    error: true,
    status: 404,
    body: {
      title: 'ORDEN_NO_ENCONTRADA',
      message: 'El número del pedido no existe en la base de datos.'
    }
  }
}

module.exports = kardex
