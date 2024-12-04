"use client";
import Link from 'next/link';
import './mesasdestaque.css';
import { MesaI } from '../../utils/types/mesas';
import { useEffect, useState } from 'react';
import { ItemMesa } from '../ItemMesa/itemmesa';

const MesasDestaque = () => {
    const [mesas, setMesas] = useState<MesaI[]>([]);

    // useEffect para executar apenas na montagem
    useEffect(() => {
        const getDados = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/mesas/destaque`);
            const dados = await response.json();
            setMesas(dados);
        };

        getDados()
    }, []); // Dependências vazias para executar apenas uma vez

    const listaMesas = mesas.map(mesa => (
        <ItemMesa dataMesas={mesa} key={mesa.id} />
    ));

    return (
        <div>
            <h1>Mesas Em Destaque</h1>
            <div className="cards">
                {listaMesas ? (
                    listaMesas
                ) : (
                    <p>Carregando...</p>
                )}
            </div>
        </div>
    );
};

export default MesasDestaque;
