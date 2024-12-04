"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './pesquisa.css';

const Pesquisa = () => {
    const [termo, setTermo] = useState('');
    const router = useRouter();

    // Função para lidar com o envio do formulário
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Impede o comportamento padrão do form (recarregar a página)
        if (termo) {
            // Redireciona para a rota de pesquisa com o termo
            router.push(`/pesquisa/${termo}`);
        }
    };

    // Função para lidar com o clique na div de filtros (voltar para home)
    const handleClickFiltros = () => {
        router.push('/'); // Redireciona para a página inicial
    };

    // Função para lidar com o clique no botão de pesquisa
    const handleClickPesquisa = () => {
        if (termo) {
            // Redireciona para a rota de pesquisa com o termo
            router.push(`/pesquisa/${termo}`);
        }
    };

    return (
        <section>
            <form className="pesquisa-home" onSubmit={handleSubmit}>
                <div className="filtros" onClick={handleClickFiltros}>
                    <img src="/img/filter.svg" alt="filtros" />
                </div>
                <div className="pesquisa-texto">
                    <input 
                        type="text" 
                        id="pesquisa" 
                        name="pesquisa" 
                        placeholder="Buscar mesas por nome ou sistema..."
                        value={termo}
                        onChange={(e) => setTermo(e.target.value)} 
                    />
                </div>
                <div className="botao" onClick={handleClickPesquisa}>
                    <img src="/img/search.svg" alt="pesquisar" />
                </div>
            </form>
        </section>
    );
};

export default Pesquisa;
