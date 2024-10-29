import React from 'react';
import Link from 'next/link';
import './pesquisa.css';

const Pesquisa = () => {
    return (
        <section>
            <form className="pesquisa">
                <div className="filtros">
                    <img src="img/filter.svg" alt="filtros"/>
                </div>
                <div className="pesquisa-texto">
                    <input type="text" id="pesquisa" name="pesquisa" placeholder="Buscar mesas por nome ou sistema..."/>
                </div>
                <div className="botao">
                    <img src="img/search.svg" alt="pesquisar"/>
                </div>
            </form>
        </section>
    );
};

export default Pesquisa;