"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import './itemmesa.css';
import { MesaI } from '@/utils/types/mesas';

export function ItemMesa({ dataMesas }: { dataMesas: MesaI }) {
    const router = useRouter();

    // Verificar se o dono da mesa está online
    const donoOnline = Array.isArray(dataMesas.usuarios)
        ? dataMesas.usuarios.some((usuario) => usuario.id === dataMesas.userId)
        : false;

    // Função para navegação ao clicar no botão "Entrar"
    const handleEntrar = () => {
        router.push(`/mesa/${dataMesas.id}`);
    };

    return (
        <div className="card">
            <div id="div1">
                <img src={dataMesas.imagem.url} alt={"Imagem da mesa " + dataMesas.nome} />
                <div id="div2">
                    <h2>{dataMesas.nome}</h2>
                    <h3>{dataMesas.sistema}</h3>
                </div>
            </div>
            <h4>{dataMesas.descricao}</h4>
            <div id="div3">
                {/* Exibe se há vagas com classe condicional */}
                <h5 id="vagas" className={!dataMesas.vagas ? "invisivel" : ""}>
                    Há Vagas
                </h5>
                {/* Exibe se o dono está online com classe condicional */}
                <h5 id="onlineMestre" className={!donoOnline ? "invisivel" : ""}>
                    Mestre Online
                </h5>
                {/* Botão que chama a função de navegação */}
                <button onClick={handleEntrar}>Entrar</button>
            </div>
        </div>
    );
}

