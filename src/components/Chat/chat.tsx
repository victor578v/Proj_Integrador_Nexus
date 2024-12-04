import React, { useEffect, useState, useRef } from "react";
import "./chat.css";
import { ItemMensagem } from "../ItemMensagem/itemmensagem";
import { MesaIdI } from "@/utils/types/mesas";
import { MensagemI } from "@/utils/types/mensagens";
import { useUsuarioStore } from "@/context/usuario";
import Swal from 'sweetalert2';

const Chat: React.FC<MesaIdI> = ({ mesaId }) => {
    const [mensagens, setMensagens] = useState<MensagemI[]>([]);
    const [novaMensagem, setNovaMensagem] = useState("");
    const { usuario } = useUsuarioStore(); // Obtém o usuário logado
    const mensagensRef = useRef<HTMLDivElement>(null); // Referência para a div de mensagens
    const inputRef = useRef<HTMLTextAreaElement>(null); // Referência para o input de mensagem



    const getDadosMensagens = async () => {
        if (!mesaId) return;

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL_API}/mesas/${mesaId}/mensagens`
            );
            if (!response.ok) throw new Error("Erro ao buscar mensagens");

            const dados: MensagemI[] = await response.json();
            // Evita atualizar o estado se as mensagens forem as mesmas
            if (JSON.stringify(dados) !== JSON.stringify(mensagens)) {
                setMensagens(dados);
            }
        } catch (error) {
            console.error("Erro ao buscar mensagens: ", error);
        }
    };

    useEffect(() => {
        getDadosMensagens();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            getDadosMensagens();
        }, 4000); // 1000ms = 1 segundo

        // Limpeza do intervalo quando o componente for desmontado ou o mesaId mudar
        return () => {
            clearInterval(intervalId); // Limpa o intervalo para evitar vazamentos de memória
        };
    }, [mesaId]);

    useEffect(() => {
        // Rola para o final sempre que as mensagens mudam
        if (mensagensRef.current) {
            mensagensRef.current.scrollTop = mensagensRef.current.scrollHeight;
        }

    }, [mensagens]); // Reage à mudança nas mensagens

    // Função para remover mensagem do estado

    const enviarMensagem = async () => {
        // Verifica se há um usuário logado
        if (usuario.id === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Você precisa estar logado para enviar mensagens.',
            });
            return;
        }

        // Verifica se a mensagem não está vazia
        if (novaMensagem.trim() === "") {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'A mensagem não pode estar vazia.',
            });
            return;
        }

        // Envia a mensagem normalmente, mesmo que contenha a rolagem de dados
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL_API}/mesas/${mesaId}/${usuario.id}/mensagens`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ conteudo: novaMensagem }),
                }
            );

            if (!response.ok) throw new Error("Erro ao enviar mensagem");

            setNovaMensagem(""); // Limpa o campo de entrada

            // Manter foco no input após enviar a mensagem
            if (inputRef.current) {
                inputRef.current.focus();
            }

            // Verifica se a mensagem começa com "/r " (para rolagem de dados)
            if (novaMensagem.startsWith("/r ")) {
                const dadosRolagem = novaMensagem.slice(3).trim(); // Extrai a parte após "/r "

                try {
                    const rolagemResponse = await fetch(
                        `${process.env.NEXT_PUBLIC_URL_API}/sistema/rolar`, // Envia os dados de rolagem para o backend
                        {
                            method: "POST", // Usando o método POST
                            headers: {
                                "Content-Type": "application/json", // Definindo o tipo de conteúdo como JSON
                            },
                            body: JSON.stringify({ dado: dadosRolagem }), // Envia o dado como JSON no corpo
                        }
                    );

                    if (!rolagemResponse.ok) throw new Error("Erro ao rolar dados");

                    const dadosRolados = await rolagemResponse.json();

                    // Iniciar a construção da descrição
                    let partesRolagem = [];
                    const resultados = dadosRolados.resultados;
                    const somaTotal = dadosRolados.somaTotal;

                    // Separar os modificadores explícitos do restante dos dados
                    const dadosOriginais = dadosRolados.dados.split("+");
                    let modificadores: any[] = [];
                    let dados = [];

                    dadosOriginais.forEach((parte: string) => {
                        if (parte.match(/^\d+$/)) {
                            modificadores.push(parte);
                        } else {
                            dados.push(parte);
                        }
                    });

                    // Construir as partes da rolagem de dados
                    for (const dado in resultados) {
                        if (resultados.hasOwnProperty(dado)) {
                            const valores = resultados[dado].filter((valor: null) => valor !== null);

                            if (valores.length > 0) {
                                partesRolagem.push(`${dado} = (${valores.join(", ")})`);
                            }
                        }
                    }

                    // Adicionar os modificadores, se existirem
                    if (modificadores.length > 0) {
                        partesRolagem.push(...modificadores);
                    }

                    // Combinar as partes em uma string descritiva
                    const descricaoRolagem = `Resultado (${partesRolagem.join(" + ")}) = ${somaTotal}`;

                    console.log(descricaoRolagem);

                    // Enviar a mensagem para o sistema
                    const respostaSistemaResponse = await fetch(
                        `${process.env.NEXT_PUBLIC_URL_API}/mesas/${mesaId}/${100}/mensagens`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ conteudo: descricaoRolagem }),
                        }
                    );

                    if (!respostaSistemaResponse.ok) throw new Error("Erro ao enviar resposta do sistema");
                } catch (error) {
                    console.error(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro',
                        text: 'Erro ao rolar dados.',
                    });
                }
            }

        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro ao enviar mensagem.',
            });
        }
    };




    // Função que captura o evento Enter para enviar a mensagem
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            enviarMensagem();
        }
    };

    const atualizarComando = (dado: string) => {
        // Expressão regular para capturar os dados existentes no comando
        const regex = /\/r\s*(\d*d\d+([+-]\d+)?)*/;

        // Verifica se já há um comando de rolagem no campo de mensagem
        if (novaMensagem.trim().startsWith("/r")) {
            const match = novaMensagem.match(regex);

            if (match) {
                let novoComando = match[0]; // O comando atual de rolagem

                // Verifica se já existe o dado que foi clicado (d4, d6, etc)
                const dadoExistenteRegex = new RegExp(`(\\d*)d${dado}`);
                const dadoExistente = novoComando.match(dadoExistenteRegex);

                if (dadoExistente) {
                    // Se o dado já existe, incrementa a quantidade
                    novoComando = novoComando.replace(
                        new RegExp(`(\\d*)d${dado}`),
                        (match, quantidade) => {
                            const novaQuantidade = parseInt(quantidade || "1", 10) + 1;
                            return `${novaQuantidade}d${dado}`;
                        }
                    );
                } else {
                    // Caso contrário, adiciona o dado com o prefixo "+"
                    novoComando += `+1d${dado}`;
                }

                setNovaMensagem(novoComando);  // Atualiza a mensagem com o novo comando
            }
        } else {
            // Se não há comando de rolagem, começa um novo comando
            setNovaMensagem(`/r 1d${dado}`);
        }
    };




    const listaMensagens = mensagens.map((mensagem) => (
        <ItemMensagem key={mensagem.id} dataMensagem={mensagem}
        />
    ));

    return (
        <section className="chat">
            <div className="mensagens" ref={mensagensRef}>
                {listaMensagens}
            </div>

            <div className="enviar-mensagem">
                <textarea
                    name="mensagem"
                    id="mensagem"
                    placeholder="Digite sua mensagem..."
                    value={novaMensagem}
                    onChange={(e) => setNovaMensagem(e.target.value)}
                    onKeyDown={handleKeyDown} // Detecta o pressionamento da tecla
                    ref={inputRef} // Atribui a referência para o input
                />
                <div className="botoes">
                    <button className="btn-dado-4" onClick={() => atualizarComando("4")}>🎲 D4</button>
                    <button className="btn-dado-6" onClick={() => atualizarComando("6")}>🎲 D6</button>
                    <button className="btn-dado-8" onClick={() => atualizarComando("8")}>🎲 D8</button>
                    <button className="btn-dado-10" onClick={() => atualizarComando("10")}>🎲 D10</button>
                    <button className="btn-dado-12" onClick={() => atualizarComando("12")}>🎲 D12</button>
                    <button className="btn-dado-20" onClick={() => atualizarComando("20")}>🎲 D20</button>
                    <button className="btn-dado-100" onClick={() => atualizarComando("100")}>🎲 D100</button>
                </div>
            </div>
        </section>
    );
};

export default Chat;
