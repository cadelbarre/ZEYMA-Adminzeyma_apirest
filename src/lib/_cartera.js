const cartera = {
  ClientDoesntHaveDebts: {
    error: true,
    status: 404,
    body: {
      title: 'ERROR_DE_BUSQUEDA',
      message: 'El cliente no posee ninguna factura en cartera.'
    }
  }
}

module.exports = cartera
