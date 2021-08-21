const sellersError = {
  sellerNotFounded: {
    error: true,
    status: 404,
    body: {
      title: 'NO_ENCONTRADO',
      message: 'El vendedor no existe en la base de datos.'
    }
  }
}

module.exports = sellersError
