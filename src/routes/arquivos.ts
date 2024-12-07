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

router.get("/mesas/:id/arquivos", async (req, res) => {
    const { id } = req.params;

    try {
        const arquivos = await prisma.arquivo.findMany({
            where: { mesaId: parseInt(id) },
        });

        res.json(arquivos);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar arquivos da mesa." });
    }
});

router.get("/mesas/:id/arquivos/pesquisa", async (req, res) => {
    const { id } = req.params; // ID da mesa
    const { nome } = req.query; // Nome para pesquisa

    try {
        // Verifica se há o parâmetro de nome para fazer o filtro
        const arquivos = await prisma.arquivo.findMany({
            where: {
                mesaId: parseInt(id),
                nome: {
                    contains: nome as string, // Filtro case-insensitive
                    mode: 'insensitive', // Filtro sem diferenciar maiúsculas de minúsculas
                },
            },
        });

        res.json(arquivos);
    } catch (error) {
        console.error("Erro ao buscar arquivos:", error);
        res.status(500).json({ error: "Erro ao buscar arquivos da mesa." });
    }
});

// Rota para excluir um arquivo
router.delete("/arquivos/:id", async (req, res) => {
    const { id } = req.params; // ID do arquivo a ser excluído

    try {
        const arquivoDeletado = await prisma.arquivo.delete({
            where: { id: parseInt(id) },
        });

        res.json(arquivoDeletado); // Retorna o arquivo deletado
    } catch (error) {
        console.error("Erro ao excluir o arquivo:", error);
        res.status(500).json({ error: "Erro ao excluir o arquivo." });
    }
});


router.post("/mesas/:id/arquivos", async (req, res) => {
    const { id } = req.params;
    const { nome, conteudo } = req.body;

    try {
        const arquivo = await prisma.arquivo.create({
            data: {
                nome,
                conteudo,
                mesaId: parseInt(id),
            },
        });

        res.status(201).json(arquivo);
    } catch (error) {
        res.status(500).json({ error: "Erro ao adicionar arquivo à mesa." });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params; // ID do arquivo
    const { conteudo } = req.body; // Novo conteúdo do arquivo

    try {
        // Atualiza o conteúdo do arquivo no banco de dados
        const arquivoAtualizado = await prisma.arquivo.update({
            where: { id: parseInt(id) },
            data: { conteudo },
        });

        res.json(arquivoAtualizado); // Retorna o arquivo atualizado
    } catch (error) {
        console.error("Erro ao atualizar o conteúdo do arquivo:", error);
        res.status(500).json({ error: "Erro ao atualizar o conteúdo do arquivo." });
    }
});


export default router;