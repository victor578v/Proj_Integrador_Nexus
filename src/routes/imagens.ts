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
    const imagens = await prisma.imagem.findMany({});
    res.json(imagens);
  });

router.get('/imagem/:id', async (req, res) => {
    const { id } = req.params; // Pega o ID da imagem na URL
    try {
        const imagem = await prisma.imagem.findUnique({
            where: { id: parseInt(id) }, // Encontra a imagem com o ID fornecido
        });

        if (!imagem) {
            return res.status(404).json({ error: 'imagem não encontrada' });
        }

        res.json(imagem); // Retorna os dados da imagem
    } catch (error) {
        console.error('Erro ao buscar imagem pelo ID:', error);
        res.status(500).json({ error: 'Erro ao buscar imagem' });
    }
});

router.put('/imagem/:id', async (req, res) => {
    const { id } = req.params;
    const { url } = req.body;
    try {
        const imagemAtualizada = await prisma.imagem.update({
            where: { id: parseInt(id) },
            data: { url },
        });
        res.json(imagemAtualizada);
    } catch (error) {
        console.error('Erro ao atualizar imagem:', error);
        res.status(500).json({ error: 'Erro ao atualizar imagem' });
    }
});

export default router;