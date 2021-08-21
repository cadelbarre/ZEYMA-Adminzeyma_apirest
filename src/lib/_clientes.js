const clientes = {
  ClientDoesntExist: {
    error: true,
    status: 404,
    body: {
      title: 'CLIENTE_NO_ENCONTRADO',
      message: 'El cliente no existe en la base de datos.'
    }
  }
}

module.exports = clientes
