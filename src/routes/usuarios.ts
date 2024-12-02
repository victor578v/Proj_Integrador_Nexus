import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import bcrypt from 'bcrypt';


// Configuração do Prisma Client com logs
const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
})

// Log de consultas
prisma.$on('query', (e) => {
  console.log('Query: ' + e.query)
  console.log('Params: ' + e.params)
  console.log('Duration: ' + e.duration + 'ms')
})

const router = Router()

router.get('/', async (req, res) => {
  const usuarios = await prisma.usuario.findMany({
    include: {
      personagens: true, // Inclui os dados da imagem
    },
  });
  res.json(usuarios);
});

router.post("/login", async (req, res) => {
  const { email, senha } = req.body

  if (!email || !senha) {
    res.status(400).json({ erro: "Login ou senha incorretos" })
    return
  }

  try {
    const usuario = await prisma.usuario.findUnique({
      where: { email }
    })

    if (usuario == null) {
      res.status(400).json({ erro: "Login ou senha incorretos" })
      return
    }

    if (bcrypt.compareSync(senha, usuario.senha)) {
      res.status(200).json({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      })
    } else {
      res.status(400).json({ erro: "Login ou senha incorretos" })
    }
  } catch (error) {
    res.status(400).json(error)
  }
})

router.post("/cadastro", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    res.status(400).json({ erro: "Todos os campos são obrigatórios" });
    return;
  }

  try {
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email }
    });

    if (usuarioExistente) {
      res.status(400).json({ erro: "Email já cadastrado" });
      return;
    }

    const saltRounds = 10;
    const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaCriptografada
      }
    });

    res.status(201).json({
      id: novoUsuario.id,
      nome: novoUsuario.nome,
      email: novoUsuario.email
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao registrar usuário" });
  }
});


router.get("/:id", async (req, res) => {
  const { id } = req.params

  try {
    // Converte o id de string para número
    const usuarioId = parseInt(id, 10)

    // Valida se a conversão foi bem-sucedida
    if (isNaN(usuarioId)) {
      return res.status(400).json({ erro: "ID inválido" })
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId } // Usa o ID convertido
    })

    if (!usuario) {
      res.status(400).json({ erro: "usuario não cadastrado" })
    } else {
      res.status(200).json({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      })
    }
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router