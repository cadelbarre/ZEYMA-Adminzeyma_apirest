const express = require('express')
const app = express()
const cors = require('cors')

// CONFIGURACION
app.set('port', process.env.PORT || '4000')

// MIDDLEWARE
app.use(express.json())
app.use(cors())

// ROUTES
app.use(require('./src/routes/usuarios.routes'))
// app.use(require('./src/middleware/validate-token')) // Middleware para proteger las rutas
app.use(require('./src/routes/cartera.routes'))
app.use(require('./src/routes/clientes.routes'))
app.use(require('./src/routes/kardex.routes'))
app.use(require('./src/routes/productos.routes'))
app.use(require('./src/routes/vendedores.routes'))
app.use(require('./src/routes/checkIn.routes'))
app.use(require('./src/routes/packIn.routes'))
app.use(require('./src/routes/pedidosBorrador.routes'))

app.listen(app.get('port'), () => {
  console.log('working in port', app.get('port'))
})
