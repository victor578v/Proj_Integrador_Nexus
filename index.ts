import express from 'express'
import usuariosRoutes from './src/routes/usuarios'
import mesasRoutes from './src/routes/mesas'
import imagensRoutes from './src/routes/imagens'
import sistemaRoutes from './src/routes/sistema'
import personagemRoutes from './src/routes/personagens'
import arquivosRoutes from './src/routes/arquivos'
import cors from 'cors'
import { PrismaClient } from "@prisma/client"

const app = express()
const port = 3004
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors())

app.use("/usuarios", usuariosRoutes)
app.use("/mesas", mesasRoutes)
app.use("/imagens", imagensRoutes)
app.use("/sistema", sistemaRoutes)
app.use("/personagens", personagemRoutes)
app.use("/arquivos", arquivosRoutes)


app.get('/', (req, res) => {
  res.send('API do Projeto Nexus')
})


async function garantirUsuarioSistema() {
  // Verifica se o usuário "sistema" já existe no banco
  const usuarioExistente = await prisma.usuario.findUnique({
    where: { id: 100 }
  });

  // Se o usuário não existir, cria o usuário "sistema"
  if (!usuarioExistente) {
    await prisma.usuario.create({
      data: {
        id: 100,
        nome: 'sistema',
        email: 'sistema@dominio.com', // Defina um email padrão, se necessário
        senha: 'senhaForte', // Defina uma senha padrão, ou crie uma senha gerada dinamicamente
      }
    });

    console.log('Usuário "sistema" criado!');
  } else {
    console.log('Usuário "sistema" já existe.');
  }
}

// Chama a função para garantir que o usuário "sistema" existe
garantirUsuarioSistema();

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})