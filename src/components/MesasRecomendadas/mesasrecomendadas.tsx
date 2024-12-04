"use client";
import React, { useEffect, useState } from "react";
import "./mesasrecomendadas.css";
import { MesaI } from "@/utils/types/mesas";
import { ItemMesa } from "../ItemMesa/itemmesa";

const MesasRecomendadas = () => {
  const [mesasRecomendadas, setMesasRecomendadas] = useState<MesaI[]>([]);

  useEffect(() => {
    const getDadosMesas = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/mesas`);
          const dados: MesaI[] = await response.json();
          // Embaralhar e selecionar 5 mesas aleatórias
          const mesasAleatorias = dados
            .sort(() => Math.random() - 0.5) // Embaralha a lista
            .slice(0, 5); // Seleciona as 5 primeiras
          setMesasRecomendadas(mesasAleatorias);
        } catch (error) {
          console.error("Erro ao buscar mesas:", error);
        }
      };

    getDadosMesas();
  }, []); // Dependências vazias para executar apenas uma vez

  return (
    <div>
      <h1>Mesas Recomendadas</h1>
      <div className="cards">
        {mesasRecomendadas.length > 0 ? (
          mesasRecomendadas.map((mesa) => (
            <ItemMesa dataMesas={mesa} key={mesa.id} />
          ))
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </div>
  );
};

export default MesasRecomendadas;
