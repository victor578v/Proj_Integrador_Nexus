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
      personagens: {
        include: {
          imagem: true, // Inclui os dados da imagem do personagem
        },
      },
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
  const { id } = req.params;

  try {
    // Converte o id de string para número
    const usuarioId = parseInt(id, 10);

    // Valida se a conversão foi bem-sucedida
    if (isNaN(usuarioId)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioId }, // Usa o ID convertido
      include: {
        personagens: {
          include: {
            imagem: true, // Inclui os dados da imagem do personagem
          },
        },
      },
    });

    if (!usuario) {
      return res.status(400).json({ erro: "Usuário não cadastrado" });
    }

    res.status(200).json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      personagens: usuario.personagens.map((personagem) => ({
        id: personagem.id,
        nickname: personagem.nickname,
        vidaMaxima: personagem.vidaMaxima,
        vidaAtual: personagem.vidaAtual,
        imagem: personagem.imagem, // Inclui os dados da imagem
      })),
    });
  } catch (error) {
    console.error(error); // Para debugar melhor caso ocorra um erro
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
});

router.get("/:id/mesas", async (req, res) => {
  const { id } = req.params;

  try {
    // Converte o id de string para número
    const usuarioId = parseInt(id, 10);

    // Valida se a conversão foi bem-sucedida
    if (isNaN(usuarioId)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    // Busca as mesas associadas ao usuário
    const usuarioMesas = await prisma.usuario.findUnique({
      where: { id: usuarioId }, // Usa o ID convertido
      include: {
        mesas: {
          include: {
            imagem: true, // Inclui os dados da imagem da mesa
          },
        },
      },
    });

    if (!usuarioMesas) {
      return res.status(400).json({ erro: "Usuário não encontrado" });
    }

    // Retorna as mesas do usuário
    res.status(200).json(usuarioMesas.mesas.map((mesa) => ({
      id: mesa.id,
      nome: mesa.nome,
      descricao: mesa.descricao,
      sistema: mesa.sistema,
      vagas: mesa.vagas,
      mestre_mesa: mesa.mestre_mesa,
      imagem: mesa.imagem, // Inclui os dados da imagem da mesa
    })));
  } catch (error) {
    console.error(error); // Para debugar melhor caso ocorra um erro
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
});


router.post("/adicionar-personagem/:mesaId/:usuarioId", async (req, res) => {
  const { mesaId, usuarioId } = req.params; // Obtendo os IDs dos parâmetros de rota
  const { nickname, vidaMaxima, vidaAtual, imagemUrl } = req.body; // Dados do body

  try {
    // Validações básicas para os IDs
    if (!mesaId || !usuarioId) {
      return res.status(400).json({ erro: "Parâmetros mesaId e usuarioId são obrigatórios." });
    }

    const mesaIdNum = parseInt(mesaId, 10);
    const usuarioIdNum = parseInt(usuarioId, 10);

    if (isNaN(mesaIdNum) || isNaN(usuarioIdNum)) {
      return res.status(400).json({ erro: "Parâmetros mesaId ou usuarioId inválidos." });
    }

    // Verifica se o usuário existe
    const usuario = await prisma.usuario.findUnique({
      where: { id: usuarioIdNum },
    });

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    // Verifica se a mesa existe
    const mesa = await prisma.mesa.findUnique({
      where: { id: mesaIdNum },
    });

    if (!mesa) {
      return res.status(404).json({ erro: "Mesa não encontrada." });
    }

    // Verifica se o usuário já possui um personagem na mesa
    const personagemExistente = await prisma.personagem.findUnique({
      where: {
        userId_mesaId: {
          userId: usuarioIdNum,
          mesaId: mesaIdNum,
        },
      },
    });

    if (personagemExistente) {
      return res.status(400).json({ erro: "Usuário já possui um personagem nesta mesa." });
    }

    // Cria a imagem com a URL fornecida
    const imagem = await prisma.imagem.create({
      data: {
        url: imagemUrl || '/img/placeholder.webp', // Usa a URL fornecida ou um placeholder
      },
    });

    // Cria o personagem com a nova imagem
    const personagem = await prisma.personagem.create({
      data: {
        nickname: nickname || "Sem Personagem",
        vidaMaxima: vidaMaxima || 0,
        vidaAtual: vidaAtual || 0,
        userId: usuarioIdNum,
        mesaId: mesaIdNum,
        imagemId: imagem.id, // Usa o id da nova imagem criada
      },
    });

    res.status(201).json({
      mensagem: "Personagem criado com sucesso.",
      personagem,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao criar personagem." });
  }
});

router.delete("/excluir-personagem/:mesaId/:usuarioId", async (req, res) => {
  const { mesaId, usuarioId } = req.params;

  try {
    const mesaIdNum = parseInt(mesaId, 10);
    const usuarioIdNum = parseInt(usuarioId, 10);

    if (isNaN(mesaIdNum) || isNaN(usuarioIdNum)) {
      return res.status(400).json({ erro: "Parâmetros mesaId ou usuarioId inválidos." });
    }

    // Verifica se o personagem existe
    const personagem = await prisma.personagem.findUnique({
      where: {
        userId_mesaId: {
          userId: usuarioIdNum,
          mesaId: mesaIdNum,
        },
      },
    });

    if (!personagem) {
      return res.status(404).json({ erro: "Personagem não encontrado nesta mesa." });
    }

    // Exclui o personagem
    await prisma.personagem.delete({
      where: {
        id: personagem.id,
      },
    });

    res.status(200).json({ mensagem: "Personagem excluído com sucesso." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao excluir personagem." });
  }
});

router.put("/modificar-personagem/:mesaId/:usuarioId", async (req, res) => {
  const { mesaId, usuarioId } = req.params;
  const { nickname, vidaMaxima, vidaAtual, imagemUrl } = req.body;

  try {
    const mesaIdNum = parseInt(mesaId, 10);
    const usuarioIdNum = parseInt(usuarioId, 10);

    if (isNaN(mesaIdNum) || isNaN(usuarioIdNum)) {
      return res.status(400).json({ erro: "Parâmetros mesaId ou usuarioId inválidos." });
    }

    // Verifica se o personagem existe
    const personagem = await prisma.personagem.findUnique({
      where: {
        userId_mesaId: {
          userId: usuarioIdNum,
          mesaId: mesaIdNum,
        },
      },
    });

    if (!personagem) {
      return res.status(404).json({ erro: "Personagem não encontrado nesta mesa." });
    }

    // Atualiza os dados do personagem
    const personagemAtualizado = await prisma.personagem.update({
      where: {
        id: personagem.id,
      },
      data: {
        nickname: nickname || personagem.nickname,
        vidaMaxima: vidaMaxima ?? personagem.vidaMaxima,
        vidaAtual: vidaAtual ?? personagem.vidaAtual,
        imagem: imagemUrl
          ? {
              update: {
                url: imagemUrl,
              },
            }
          : undefined, // Atualiza a imagem se a URL for fornecida
      },
    });

    res.status(200).json({
      mensagem: "Personagem atualizado com sucesso.",
      personagem: personagemAtualizado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao modificar personagem." });
  }
});

export default router