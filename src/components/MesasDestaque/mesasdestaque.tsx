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
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/mesas/destaque`, {
                    headers: {
                        "ngrok-skip-browser-warning": "true", // Cabeçalho para evitar o aviso do Ngrok
                    },
                });
    
                if (!response.ok) {
                    throw new Error('Erro ao buscar dados');
                }
    
                const dados = await response.json();
                setMesas(dados);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        };
    
        getDados();
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
