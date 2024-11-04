"use client";
import React from 'react';
import './itemjogador.css';
import { UsuarioI } from '@/utils/types/usuarios';
import { PersonagemI } from '@/utils/types/personagens';

export function ItemJogador({ dataUsuarios, mesaId }: { dataUsuarios: UsuarioI; mesaId: number; }) {
    const personagem = dataUsuarios.personagens.find((personagem: PersonagemI) => personagem.mesaId === mesaId);

    return (
        <div className="jogador">
            <img src="/img/placeholder.webp" alt={`Imagem do jogador ${dataUsuarios.nome}`} />
            <div className="separador-img-conteudo">
                <h1>{personagem ? personagem.nickname : "Sem Personagem"}</h1>
                <h2>{dataUsuarios.nome}</h2>
                <div className="barrinha">
                    {/* Exibindo vida atual e máxima */}
                    <h3>{personagem ? `${personagem.vidaAtual}/${personagem.vidaMaxima}` : "0/0"}</h3>
                </div>
            </div>
        </div>
    );
}
