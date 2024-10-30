import React from 'react';
import Link from 'next/link';
import './itemmensagem.css';

const ItemMensagem = () => {
    return (
        <div className="mensagem">
            <div className="identificadores">
                <h2>Nome Personagem</h2>
                <h3>Nome Usuario</h3>
            </div>
            <h1>Mensagem LOREM IPSUM</h1>
        </div>
    );
};

export default ItemMensagem;