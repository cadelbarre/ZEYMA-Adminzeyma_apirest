const authError = {
  authenticationError: {
    error: true,
    status: 401,
    body: {
      title: 'ACCESO_DENEGADO',
      message:
          'La contraseña ó el usuario son incorrecta. Vuelve a intentarlo.',
      details: 'Error al intentar logearse'
    }
  },
  invalidToken: {
    error: true,
    status: 401,
    body: {
      title: 'ACCESO_FALLIDO',
      message: 'Token inválido'
    }
  },
  tokenNotProvided: {
    error: true,
    status: 401,
    body: {
      title: 'ACCESO_FALLIDO',
      message: 'Token no provisto'
    }
  }
}

module.exports = authError
