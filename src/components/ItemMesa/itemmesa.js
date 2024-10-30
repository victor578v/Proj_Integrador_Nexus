import React from 'react';
import Link from 'next/link';
import './itemmesa.css';

const ItemMesa = () => {
    return (
        <div className="card">
            <div id="div1">
                <img src="img/placeholder.webp" alt="Imagem da mesa" />
                <div id="div2">
                    <h2>Nome da mesa</h2>
                    <h3>Sistema da mesa</h3>
                </div>
            </div>
            <h4>Descricao da mesa</h4>
            <div id="div3">
                <h5 id="vagas">Há Vagas</h5>
                <h5 id="onlineMestre">Mestre Online</h5>
                <a href='./mesa'><button>Entrar</button></a>
            </div>
        </div>
    );
};

export default ItemMesa;