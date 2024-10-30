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
    const mesas = await prisma.mesa.findMany();
    res.json(mesas);
});


export default router