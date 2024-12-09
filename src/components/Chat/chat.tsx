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
    const { usuario } = useUsuarioStore();
    const mensagensRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const getDadosMensagens = async () => {
        if (!mesaId) return;

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL_API}/mesas/${mesaId}/mensagens`,
                {
                    method: 'GET',
                    headers: {
                        'ngrok-skip-browser-warning': 'true',
                        'Content-Type': 'application/json',
                    }
                }
            );
            if (!response.ok) throw new Error("Erro ao buscar mensagens");

            const dados: MensagemI[] = await response.json();
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
        }, 4000);

        return () => {
            clearInterval(intervalId);
        };
    }, [mesaId]);

    useEffect(() => {
        if (mensagensRef.current) {
            mensagensRef.current.scrollTop = mensagensRef.current.scrollHeight;
        }
    }, [mensagens]);

    const enviarMensagem = async () => {
        if (usuario.id === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Você precisa estar logado para enviar mensagens.',
            });
            return;
        }

        if (novaMensagem.trim() === "") {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'A mensagem não pode estar vazia.',
            });
            return;
        }

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL_API}/mesas/${mesaId}/${usuario.id}/mensagens`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'ngrok-skip-browser-warning': 'true',
                    },
                    body: JSON.stringify({ conteudo: novaMensagem }),
                }
            );

            if (!response.ok) throw new Error("Erro ao enviar mensagem");

            setNovaMensagem("");

            if (inputRef.current) {
                inputRef.current.focus();
            }

            if (novaMensagem.startsWith("/r ")) {
                const dadosRolagem = novaMensagem.slice(3).trim();

                try {
                    const rolagemResponse = await fetch(
                        `${process.env.NEXT_PUBLIC_URL_API}/sistema/rolar`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "ngrok-skip-browser-warning": "true",
                            },
                            body: JSON.stringify({ dado: dadosRolagem }),
                        }
                    );

                    if (!rolagemResponse.ok) throw new Error("Erro ao rolar dados");

                    const dadosRolados = await rolagemResponse.json();

                    let partesRolagem = [];
                    const resultados = dadosRolados.resultados;
                    const somaTotal = dadosRolados.somaTotal;

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

                    for (const dado in resultados) {
                        if (resultados.hasOwnProperty(dado)) {
                            const valores = resultados[dado].filter((valor: null) => valor !== null);

                            if (valores.length > 0) {
                                partesRolagem.push(`${dado} = (${valores.join(", ")})`);
                            }
                        }
                    }

                    if (modificadores.length > 0) {
                        partesRolagem.push(...modificadores);
                    }

                    const descricaoRolagem = `Resultado (${partesRolagem.join(" + ")}) = ${somaTotal}`;

                    console.log(descricaoRolagem);

                    const respostaSistemaResponse = await fetch(
                        `${process.env.NEXT_PUBLIC_URL_API}/mesas/${mesaId}/${100}/mensagens`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "ngrok-skip-browser-warning": "true",
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            enviarMensagem();
        }
    };

    const atualizarComando = (dado: string) => {
        const regex = /\/r\s*(\d*d\d+([+-]\d+)?)*/;

        if (novaMensagem.trim().startsWith("/r")) {
            const match = novaMensagem.match(regex);

            if (match) {
                let novoComando = match[0];

                const dadoExistenteRegex = new RegExp(`(\\d*)d${dado}`);
                const dadoExistente = novoComando.match(dadoExistenteRegex);

                if (dadoExistente) {
                    novoComando = novoComando.replace(
                        new RegExp(`(\\d*)d${dado}`),
                        (match, quantidade) => {
                            const novaQuantidade = parseInt(quantidade || "1", 10) + 1;
                            return `${novaQuantidade}d${dado}`;
                        }
                    );
                } else {
                    novoComando += `+1d${dado}`;
                }

                setNovaMensagem(novoComando);
            }
        } else {
            setNovaMensagem(`/r 1d${dado}`);
        }
    };

    const usarIA = async () => {
        if (novaMensagem.trim() === "") {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'A mensagem não pode estar vazia.',
            });
            return;
        }
    
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL_API}/sistema/ia`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "true",
                    },
                    body: JSON.stringify({ prompt: novaMensagem }),
                }
            );
    
            if (!response.ok) throw new Error("Erro ao chamar IA");
    
            const data = await response.json();
    
            // Verificando se o formato da resposta está correto
            if (data && data.message) {
                const resultadoIA: string = data.message; // Acessando a mensagem correta
                console.log(resultadoIA);
    
                setNovaMensagem(novaMensagem + " /Resposta: " + resultadoIA);
            } else {
                throw new Error('Resposta inválida do servidor.');
            }
    
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro ao utilizar a IA.',
            });
        }
    };
    

    const listaMensagens = mensagens.map((mensagem) => (
        <ItemMensagem key={mensagem.id} dataMensagem={mensagem} />
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
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                />
                <div className="botoes">
                    <button className="btn-dado-4" onClick={() => atualizarComando("4")}>🎲 D4</button>
                    <button className="btn-dado-6" onClick={() => atualizarComando("6")}>🎲 D6</button>
                    <button className="btn-dado-8" onClick={() => atualizarComando("8")}>🎲 D8</button>
                    <button className="btn-dado-10" onClick={() => atualizarComando("10")}>🎲 D10</button>
                    <button className="btn-dado-12" onClick={() => atualizarComando("12")}>🎲 D12</button>
                    <button className="btn-dado-20" onClick={() => atualizarComando("20")}>🎲 D20</button>
                    <button className="btn-dado-100" onClick={() => atualizarComando("100")}>🎲 D100</button>
                    <button className="btn-ia" onClick={usarIA}>Usar IA</button>
                </div>
            </div>
        </section>
    );
};

export default Chat;


