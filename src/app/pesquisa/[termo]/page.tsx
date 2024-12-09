"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Importa o useParams
import './page.css';
import { MesaI } from '@/utils/types/mesas';
import Pesquisa from '@/components/Pesquisa/pesquisa';
import Mesas from '@/components/Mesas/mesas';
import CriaMesa from '@/components/CriaMesa/criamesa';
import Banner from '@/components/Banner/banner';
import { ItemMesa } from '@/components/ItemMesa/itemmesa';

const PesquisaPage = () => {
    const [mesas, setMesas] = useState<MesaI[]>([]); // Defina o tipo como um array de MesaI
    const { termo } = useParams(); // Acessa o parâmetro 'termo' da URL dinâmica

    useEffect(() => {
        if (termo) {
            // Chama a API de pesquisa passando o termo
            fetch(`${process.env.NEXT_PUBLIC_URL_API}/mesas/pesquisa/${termo}`, {
                headers: {
                    "ngrok-skip-browser-warning": "true", 
                },
            })
                .then((response) => response.json())
                .then((data) => setMesas(data))
                .catch((error) => {
                    console.error("Erro ao buscar mesas:", error);
                });
        }
    }, [termo]); // Executa quando o termo mudar


    return (
        <section>
            <Pesquisa />
            <Mesas >
                <h1>Resultados da Pesquisa</h1>
                <div className="cards-pesquisa">

                    {mesas.length > 0 ? (
                        mesas.map((mesa) => (
                            <ItemMesa key={mesa.id} dataMesas={mesa} />
                        ))
                    ) : (
                        <p>Nenhuma mesa encontrada para o termo "{termo}".</p>
                    )}
                </div>
                <CriaMesa />
            </Mesas>
            <Banner />
        </section>
    );
};

export default PesquisaPage;
