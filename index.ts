import express from 'express'
import usuariosRoutes from './src/routes/usuarios'
import mesasRoutes from './src/routes/mesas'
import imagensRoutes from './src/routes/imagens'
import cors from 'cors'

const app = express()
const port = 3004

app.use(express.json())
app.use(cors())

app.use("/usuarios", usuariosRoutes)
app.use("/mesas", mesasRoutes)
app.use("/imagens", imagensRoutes)

app.get('/', (req, res) => {
  res.send('API: Loja de Jogos')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})
