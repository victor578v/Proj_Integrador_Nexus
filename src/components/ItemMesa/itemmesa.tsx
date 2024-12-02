"use client"
import React from 'react';
import Link from 'next/link';
import './itemmesa.css';
import { MesaI } from '@/utils/types/mesas';

export function ItemMesa({ dataMesas }: { dataMesas: MesaI }) {
    return (
        <div className="card">
            <div id="div1">
                <img src={dataMesas.imagem.url} alt={"Imagem da mesa" +dataMesas.nome} />
                <div id="div2">
                    <h2>{dataMesas.nome}</h2>
                    <h3>{dataMesas.sistema}</h3>
                </div>
            </div>
            <h4>{dataMesas.descricao}</h4>
            <div id="div3">
                <h5 id="vagas">Há Vagas</h5>
                <h5 id="onlineMestre">Mestre Online</h5>
                <Link href={`./mesa/${dataMesas.id}`}>
                    <button>Entrar</button>
                </Link>
            </div>
        </div>
    );
};
