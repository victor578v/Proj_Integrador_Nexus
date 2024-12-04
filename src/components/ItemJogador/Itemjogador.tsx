"use client";
import React, { useEffect, useState } from 'react';
import './itemjogador.css';
import { UsuarioI } from '@/utils/types/usuarios';
import { PersonagemI } from '@/utils/types/personagens';

export function ItemJogador({ dataUsuarios, mesaId }: { dataUsuarios: UsuarioI; mesaId: number; }) {
    const [personagem, setPersonagem] = useState<PersonagemI | null>(null);

    const getPersonagem = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/personagens/mesa/${mesaId}/usuario/${dataUsuarios.id}`);
            if (!response.ok) throw new Error('Erro ao buscar personagem');

            const dados: PersonagemI = await response.json();
            setPersonagem(dados);
        } catch (error) {
            console.error("Erro ao buscar personagem: ", error);
            setPersonagem(null);  // Se houver erro, garantir que personagem seja null
        }
    };

    useEffect(() => {
        getPersonagem();
    }, [mesaId, dataUsuarios]); // Reexecuta a função quando o mesaId ou dataUsuarios mudar

    return (
        <div className="jogador">
            <img src={personagem?.imagem ? personagem.imagem.url : "/img/placeholder.webp"} alt={`Imagem do jogador ${dataUsuarios.nome}`} />
            <div className="separador-img-conteudo">
                <h1>{personagem ? personagem.nickname : "Sem Personagem"}</h1>
                <h2>{dataUsuarios.nome}</h2>
                <div className="barrinha">
                    <h3>{personagem ? `${personagem.vidaAtual}/${personagem.vidaMaxima}` : "0/0"}</h3>
                </div>
            </div>
        </div>
    );
}

