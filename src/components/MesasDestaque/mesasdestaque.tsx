"use client";
import Link from 'next/link';
import './mesasdestaque.css';
import { MesaI } from '../../utils/types/mesas';
import { useState, useEffect } from 'react';
import { ItemMesa } from '../ItemMesa/itemmesa';

const MesasDestaque = () => {
    const [mesas, setMesas] = useState<MesaI[]>([]);

    useEffect(() => {
        
        const getDados = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/mesas`);
            const dados = await response.json();
            console.log(dados);
            setMesas(dados);
        };

        getDados();

    }, []); 

    const listaMesas = mesas.map(mesa => (
        <ItemMesa dataMesas={mesa} key={mesa.id} />
    ));

    return (
        <div>
            <h1>Mesas Em Destaque</h1>
            <div className="cards">
                {listaMesas}
            </div>
        </div>
    );
};

export default MesasDestaque;
