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

const rolarDado = (dado: string) => {
    const [quantidade, tipo] = dado.split('d');
    const quantidadeDados = parseInt(quantidade || '1', 10); // Defina 1 como valor padrão
    const tipoDado = parseInt(tipo, 10);

    let resultados: number[] = [];

    for (let i = 0; i < quantidadeDados; i++) {
        const resultado = Math.floor(Math.random() * tipoDado) + 1; // Rolagem aleatória
        resultados.push(resultado);
    }

    return resultados;
};

// Rota para rolar múltiplos dados com modificadores
router.post('/rolar', (req, res) => {
    const { dado } = req.body;

    if (!dado) {
        return res.status(400).json({ error: 'Dado não fornecido' });
    }

    // Processar cada dado individualmente, separando os modificadores
    const dadosComModificadores = dado.split(/\s*\+\s*/); // Divide por "+" (ex: "2d6+1d4+9")
    let resultadosTotais: { [key: string]: number[] | null } = {}; // Usar null para modificadores
    let somaTotal = 0;

    // Processar cada dado e modificador
    dadosComModificadores.forEach((d: string) => {
        // Verifica se é um dado (ex: 2d6) ou um modificador (ex: +9)
        if (d.includes('d')) {
            const resultados = rolarDado(d);
            resultadosTotais[d] = resultados;
            somaTotal += resultados.reduce((acc, curr) => acc + curr, 0); // Soma os resultados dos dados
        } else {
            // Caso seja um modificador, adiciona diretamente ao total
            const modificador = parseInt(d, 10);
            if (!isNaN(modificador)) {
                if (modificador !== 0) {
                    resultadosTotais[d] = new Array(Math.abs(modificador)).fill(null); // Marca como "null" para indicar modificador
                    somaTotal += modificador; // Adiciona ao total
                }
            }
        }
    });

    // Resposta
    return res.json({
        dados: dado,
        resultados: resultadosTotais,
        somaTotal,
    });
});

export default router
