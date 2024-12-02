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

    useEffect(() => {
        const getDadosMensagens = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_URL_API}/mesas/${mesaId}/mensagens`
                );
                if (!response.ok) throw new Error("Erro ao buscar mensagens");

                const dados = await response.json();
                console.log(dados);
                setMensagens(dados);
            } catch (error) {
                console.error(error);
            }
        };

        if (mesaId) getDadosMensagens();
    }, [mesaId]);

    useEffect(() => {
        // Rola para o final sempre que as mensagens mudam
        if (mensagensRef.current) {
            mensagensRef.current.scrollTop = mensagensRef.current.scrollHeight;
        }
    }, [mensagens]); // Reage à mudança nas mensagens

    // Função para remover mensagem do estado
    const handleMensagemDeletada = (mensagemId: number) => {
        setMensagens((prevMensagens) => prevMensagens.filter((msg) => msg.id !== mensagemId));
    };

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

            const mensagemEnviada = await response.json();
            setMensagens((prevMensagens) => [...prevMensagens, mensagemEnviada]);
            setNovaMensagem(""); // Limpa o campo de entrada

            // Manter foco no input após enviar a mensagem
            if (inputRef.current) {
                inputRef.current.focus();
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Função que captura o evento Enter para enviar a mensagem
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            enviarMensagem();
        }
    };

    const listaMensagens = mensagens.map((mensagem) => (
        <ItemMensagem key={mensagem.id} dataMensagem={mensagem} onMensagemDeletada={handleMensagemDeletada}
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
                    <button className="btn-negrito">B</button>
                    <button className="btn-italico">I</button>
                    <button className="btn-underline">U</button>
                    <button className="btn-dado-4">🎲 D4</button>
                    <button className="btn-dado-6">🎲 D6</button>
                    <button className="btn-dado-8">🎲 D8</button>
                    <button className="btn-dado-10">🎲 D10</button>
                    <button className="btn-dado-12">🎲 D12</button>
                    <button className="btn-dado-20">🎲 D20</button>
                    <button className="btn-dado-100">🎲 D100</button>
                </div>
            </div>
        </section>
    );
};

export default Chat;

