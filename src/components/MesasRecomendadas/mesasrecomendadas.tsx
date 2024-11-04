"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import './mesasrecomendadas.css';
import { MesaI } from '@/utils/types/mesas';
import { ItemMesa } from '../ItemMesa/itemmesa';

const MesasRecomendadas = () => {
    const [mesas, setMesas] = useState<MesaI[]>([]);


    useEffect(() => {

        const getDadosMesas = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/mesas`);
            const dados = await response.json();
            console.log(dados);
            setMesas(dados);
        };

        getDadosMesas();
        console.log(mesas)
    }, []); 

    const listaMesas = mesas.map(mesa => (
        <ItemMesa dataMesas={mesa} key={mesa.id} />
    ));

    return (
        <div>
            <h1>Mesas Recomendadas</h1>
            <div className="cards">
                {listaMesas}
            </div>
        </div>
    );
};

export default MesasRecomendadas;