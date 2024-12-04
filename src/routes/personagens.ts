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
    const personagens = await prisma.personagem.findMany({
        include: {
            imagem: true, // Inclui os dados da imagem do personagem
        },
    });
    res.json(personagens);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params; // Obtém o ID do personagem dos parâmetros da rota

    try {
        // Converte o ID para número e valida
        const personagemId = parseInt(id, 10);
        if (isNaN(personagemId)) {
            return res.status(400).json({ erro: "ID inválido" });
        }

        // Busca o personagem pelo ID
        const personagem = await prisma.personagem.findUnique({
            where: { id: personagemId },
            include: {
                imagem: true, // Inclui os dados da imagem do personagem
            },
        });

        if (!personagem) {
            return res.status(404).json({ erro: "Personagem não encontrado" });
        }

        res.status(200).json(personagem);
    } catch (error) {
        console.error("Erro ao buscar personagem:", error);
        res.status(500).json({ erro: "Erro ao buscar personagem" });
    }
});


router.get('/mesa/:mesaId/usuario/:usuarioId', async (req, res) => {
    const { mesaId, usuarioId } = req.params; // Obtém os parâmetros da URL
    
    // Validação de IDs
    const mesaIdNum = parseInt(mesaId, 10);
    const usuarioIdNum = parseInt(usuarioId, 10);
  
    if (isNaN(mesaIdNum) || isNaN(usuarioIdNum)) {
      return res.status(400).json({ erro: "IDs inválidos." });
    }
  
    try {
      // Busca o personagem associado ao usuário e à mesa
      const personagem = await prisma.personagem.findUnique({
        where: {
          userId_mesaId: {
            userId: usuarioIdNum,
            mesaId: mesaIdNum,
          },
        },
        include: {
          imagem: true, // Inclui a imagem associada ao personagem
        },
      });
  
      // Se não encontrar o personagem, retorna erro

  
      // Retorna o personagem encontrado
      res.json(personagem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: "Erro ao buscar personagem." });
    }
  });
  

export default router