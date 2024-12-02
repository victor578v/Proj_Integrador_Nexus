import { PrismaClient, Mesa } from "@prisma/client"
import { Router } from "express"

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
  const mesas = await prisma.mesa.findMany({
    include: {
      imagem: true, // Inclui os dados da imagem
    },
  });
  res.json(mesas);
});

router.get('/mesa/:id', async (req, res) => {
  const { id } = req.params; // Pega o ID da mesa na URL
  try {
    const mesa = await prisma.mesa.findUnique({
      where: { id: parseInt(id) }, // Encontra a mesa com o ID fornecido
      include: {
        imagem: true, // Inclui os dados da imagem
      },
    });

    if (!mesa) {
      return res.status(404).json({ error: 'Mesa não encontrada' });
    }

    res.json(mesa); // Retorna os dados da mesa
  } catch (error) {
    console.error('Erro ao buscar mesa pelo ID:', error);
    res.status(500).json({ error: 'Erro ao buscar mesa' });
  }
});

router.put('/mesa/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, sistema, vagas } = req.body;
  try {
    const mesaAtualizada = await prisma.mesa.update({
      where: { id: parseInt(id) },
      data: { nome, descricao, sistema, vagas },
    });
    res.json(mesaAtualizada);
  } catch (error) {
    console.error('Erro ao atualizar mesa:', error);
    res.status(500).json({ error: 'Erro ao atualizar mesa' });
  }
});


router.get('/:mesaId/usuarios', async (req, res) => {
  const { mesaId } = req.params;

  try {
    // Consulta a mesa e carrega os usuários online e seus personagens
    const mesa = await prisma.mesa.findUnique({
      where: { id: Number(mesaId) },
      include: {
        usuarios: {
          include: {
            personagens: true, // Inclui os personagens dos usuários
          },
        },
      },
    });

    if (!mesa) {
      return res.status(404).json({ error: 'Mesa não encontrada' });
    }

    // Retorna os usuários e seus personagens da mesa
    const usuariosComPersonagens = mesa.usuarios.map(usuario => ({
      ...usuario,
      personagens: usuario.personagens || [], // Garante que sempre tenha um array de personagens
    }));

    res.json(usuariosComPersonagens);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar usuários da mesa' });
  }
});

router.get('/:mesaId/usuarios/:usuarioId/personagem', async (req, res) => {
  const { mesaId, usuarioId } = req.params;

  try {
    // Consulta a mesa e carrega os personagens do usuário especificado
    const mesa = await prisma.mesa.findUnique({
      where: { id: Number(mesaId) },
      include: {
        usuarios: {
          where: { id: Number(usuarioId) },
          include: {
            personagens: true, // Inclui os personagens do usuário
          },
        },
      },
    });

    if (!mesa) {
      return res.status(404).json({ error: 'Mesa não encontrada' });
    }

    // Obtém o personagem do usuário, se existir
    const usuario = mesa.usuarios[0]; // O usuário especificado
    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado na mesa' });
    }

    const personagem = usuario.personagens || []; // Personagens do usuário

    res.json(personagem); // Retorna os personagens encontrados
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar personagem do usuário na mesa' });
  }
});

router.post('/:mesaId/usuarios/:usuarioId', async (req, res) => {
  const { mesaId, usuarioId } = req.params;

  try {
    // Adiciona o usuário à mesa através da atualização da relação muitos-para-muitos
    await prisma.mesa.update({
      where: { id: Number(mesaId) },
      data: {
        usuarios: {
          connect: { id: Number(usuarioId) },
        },
      },
    });

    res.status(201).json({ message: 'Usuário adicionado à mesa com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao adicionar usuário à mesa' });
  }
});

router.delete('/:mesaId/usuarios/:usuarioId', async (req, res) => {
  const { mesaId, usuarioId } = req.params;

  try {
    // Remove o usuário da mesa atualizando a relação muitos-para-muitos
    await prisma.mesa.update({
      where: { id: Number(mesaId) },
      data: {
        usuarios: {
          disconnect: { id: Number(usuarioId) },
        },
      },
    });

    res.status(200).json({ message: 'Usuário removido da mesa com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao remover usuário da mesa' });
  }
});

router.get("/:mesaId/mensagens", async (req, res) => {
  const { mesaId } = req.params;

  try {
    // Verifica se o `mesaId` é um número válido
    const mesaIdInt = parseInt(mesaId, 10);
    if (isNaN(mesaIdInt)) {
      return res.status(400).json({ error: "ID da mesa inválido." });
    }

    // Recupera as mensagens associadas à mesa
    const mensagens = await prisma.mensagem.findMany({
      where: { mesaId: mesaIdInt },
      include: {
        autor: {
          select: {
            nome: true, // Nome do autor
            personagens: {
              where: { mesaId: mesaIdInt }, // Nome do personagem específico desta mesa
              select: { nickname: true, mesaId: true },
            },
          },
        },
      },
    });

    // Retorna as mensagens
    res.status(200).json(mensagens);
  } catch (error) {
    console.error("Erro ao recuperar mensagens:", error);
    res.status(500).json({ error: "Erro ao recuperar mensagens." });
  }
});



router.post("/:mesaId/:usuarioId/mensagens", async (req, res) => {
  const { mesaId, usuarioId } = req.params;
  const { conteudo } = req.body; // O conteúdo da mensagem vem no body da requisição.

  try {
    // Validação do conteúdo
    if (!conteudo || typeof conteudo !== "string" || conteudo.trim() === "") {
      return res.status(400).json({ error: "Conteúdo da mensagem é obrigatório." });
    }

    // Validações de mesaId e usuarioId
    const mesaIdInt = parseInt(mesaId, 10);
    const usuarioIdInt = parseInt(usuarioId, 10);
    if (isNaN(mesaIdInt) || isNaN(usuarioIdInt)) {
      return res.status(400).json({ error: "IDs de mesa e usuário devem ser válidos." });
    }

    // Verifica se a mesa e o usuário existem
    const [mesa, usuario] = await Promise.all([
      prisma.mesa.findUnique({ where: { id: mesaIdInt } }),
      prisma.usuario.findUnique({ where: { id: usuarioIdInt } }),
    ]);

    if (!mesa) {
      return res.status(404).json({ error: "Mesa não encontrada." });
    }
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    // Cria a mensagem
    const novaMensagem = await prisma.mensagem.create({
      data: {
        conteudo,
        userId: usuarioIdInt,
        mesaId: mesaIdInt,
      },
    });

    const mensagemComAutor = await prisma.mensagem.findUnique({
      where: { id: novaMensagem.id },
      include: {
        autor: {
          include: {
            personagens: true, // Inclui os personagens relacionados ao autor
          },
        },
      },
    });

    res.status(201).json(mensagemComAutor);
  } catch (error) {
    console.error("Erro ao postar mensagem:", error);
    res.status(500).json({ error: "Erro ao postar mensagem." });
  }
});

// Rota no backend para mesas em destaque
router.get('/destaque', async (req, res) => {
  try {
    const mesas = await prisma.mesa.findMany({
      include: { 
        usuarios: true,
        imagem: true
       },
      
      orderBy: {
        usuarios: { _count: 'desc' }, // Ordena pelo número de usuários
      },
      take: 5, // Limita a 5 mesas
    });

    res.status(200).json(mesas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar mesas em destaque' });
  }
});



router.delete("/:mensagemId/:usuarioId", async (req, res) => {
  const { mensagemId, usuarioId } = req.params;

  try {
    // Valida os IDs
    const mensagemIdInt = parseInt(mensagemId, 10);
    const usuarioIdInt = parseInt(usuarioId, 10);
    if (isNaN(mensagemIdInt) || isNaN(usuarioIdInt)) {
      return res.status(400).json({ error: "IDs de mensagem e usuário devem ser válidos." });
    }

    // Verifica se a mensagem existe
    const mensagem = await prisma.mensagem.findUnique({
      where: { id: mensagemIdInt },
    });

    if (!mensagem) {
      return res.status(404).json({ error: "Mensagem não encontrada." });
    }

    // Verifica se o autor da mensagem é o usuário logado
    if (mensagem.userId !== usuarioIdInt) {
      return res.status(403).json({ error: "Você não tem permissão para apagar esta mensagem." });
    }

    // Deleta a mensagem
    await prisma.mensagem.delete({
      where: { id: mensagemIdInt },
    });

    res.status(200).json({ message: "Mensagem deletada com sucesso." });
  } catch (error) {
    console.error("Erro ao deletar mensagem:", error);
    res.status(500).json({ error: "Erro ao deletar mensagem." });
  }
});

router.post("/", async (req, res) => {
  const { nome, sistema, descricao, userId, imagemUrl, vagas } = req.body;

  try {
    // Garantir que todos os campos obrigatórios sejam fornecidos
    if (!nome || !sistema || !descricao || !userId || !imagemUrl || vagas === undefined) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    // Garantir que vagas seja um booleano (caso venha como string)
    const vagasBoolean = vagas === 'true' ? true : vagas === 'false' ? false : Boolean(vagas);

    // Se vagas ainda não for um booleano válido, retornar erro
    if (typeof vagasBoolean !== 'boolean') {
      return res.status(400).json({ error: "'vagas' deve ser um valor booleano." });
    }

    // Criar a imagem no banco de dados
    const imagem = await prisma.imagem.create({
      data: {
        url: imagemUrl,
      },
    });

    // Criar a mesa no banco de dados
    const novaMesa = await prisma.mesa.create({
      data: {
        nome,
        sistema,
        descricao,
        userId,
        vagas: vagasBoolean, // Salvar como booleano
        imagemId: imagem.id, // Referencia a imagem criada
      },
    });

    return res.status(201).json(novaMesa);
  } catch (error) {
    console.error("Erro ao criar mesa:", error);
    return res.status(500).json({ error: "Erro ao criar mesa." });
  }
});





export default router;

