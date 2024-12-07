"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "./page.css";
import { MesaI } from "@/utils/types/mesas"; // Supondo que você tenha um tipo de mesa
import Link from "next/link";
import Banner from "@/components/Banner/banner";

const Usuario = () => {
    const { id: usuarioId } = useParams(); // ID do usuário, que vem da URL
    const [mesas, setMesas] = useState<MesaI[]>([]); // Armazena as mesas do usuário

    useEffect(() => {
        const listarMesasDoUsuario = async () => {
            if (!usuarioId) return;

            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_URL_API}/usuarios/${usuarioId}/mesas` // Supondo que a rota forneça as mesas do usuário
                );

                if (response.ok) {
                    const mesas = await response.json();
                    setMesas(mesas);
                } else {
                    console.error("Erro ao listar as mesas do usuário");
                }
            } catch (error) {
                console.error("Erro na requisição para listar as mesas do usuário", error);
            }
        };

        if (usuarioId) {
            listarMesasDoUsuario();
        }
    }, [usuarioId]);

    return (
        <main className="lista-mesas-usuario">
            <h1>Suas Mesas</h1>
            <div className="mesas-lista">
                {mesas.length === 0 ? (
                    <p>Você ainda não está em nenhuma mesa.</p>
                ) : (
                    mesas.map((mesa) => (
                        <div key={mesa.id} className="mesa-item">
                            <h2>{mesa.nome}</h2>
                            <p>{mesa.descricao}</p>
                            <Link href={`/mesa/${mesa.id}`}>
                                <button>
                                    Entrar
                                </button>
                            </Link>
                        </div>
                    ))
                )}
            </div>
            <Banner />
        </main>
    );
};

export default Usuario;
