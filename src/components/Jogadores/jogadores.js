import React from 'react';
import Link from 'next/link';
import './jogadores.css';

const Jogadores = () => {
    return (
        <>
            <div className="jogadores">
                <div className="jogador">
                    <img src="img/placeholder.webp" alt="Imagem do jogador x"/>
                        <div className="separador-img-conteudo">
                            <h1>Nome do Personagem</h1>
                            <h2>Nome do Jogador</h2>
                            <div className="barrinha">
                                <h3>0/0</h3>
                            </div>
                        </div>
                </div>
            </div>
        </>
    );
};

export default Jogadores;