import { PrismaClient } from "@prisma/client"
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

export default router;

