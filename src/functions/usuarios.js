const db = require('../db/index')
const sendResponse = require('../lib/create-error')

/**
 * Esta función nos permite buscar el hash correspondiente al usuario para poder desencriptarlo y comparar las contraseñas con la libreria "bcrypt".
 * @param {string} user - Nombre de usuario para ingresar al sistema.
 * @param {string} pass - Contraseña que fue enviada desde el formulario de ingreso.
 * @returns {object}
 */
const searchHash = async (user) => {
  const query = 'SELECT password FROM Usuarios WHERE nombre_usuario = ?'
  const placeholder = [user]

  const [result] = await db.query(query, placeholder)
  if (Array.isArray(result) && !result.length) return sendResponse('authenticationError')
  else {
    return sendResponse({
      body: result[0]
    })
  }
}

/**
 * Para obtener la información completa del usuario
 * @param {string} username - El nombre de usuario que fue enviado a través del formulario.
 * @param {string} hash - Correspondiente al password hasheado.
 * @returns {object} Toda la información relevante del usuario.
 */
const searchUserData = async (username, hash) => {
  const query = `
    SELECT BIN_TO_UUID(usuario_uuid) AS usuario_uuid,
    avatar, email, estado, nombre_completo, nombre_usuario, tipo_usuario
    FROM Usuarios WHERE nombre_usuario = ? AND password = ?`

  const placeholder = [username, hash]
  const [result] = await db.query(query, placeholder)
  return result
}

module.exports = {
  searchHash,
  searchUserData
}
