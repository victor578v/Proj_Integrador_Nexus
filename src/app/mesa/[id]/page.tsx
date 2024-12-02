"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import './page.css';
import Biblioteca from '@/components/Biblioteca/biblioteca';
import Chat from '@/components/Chat/chat';
import Jogadores from '@/components/Jogadores/jogadores';
import Sidebar from '@/components/Sidebar/sidebar';

const Mesa = () => {
    const { id: mesaId } = useParams();
    const [idUsuarioLocal, setIdUsuarioLocal] = useState<string | null>(null);
    const [refreshKey, setRefreshKey] = useState(0); // Para forçar a atualização de Jogadores
    const [isUserAdded, setIsUserAdded] = useState(false); // Estado para controlar se o usuário já foi adicionado

    useEffect(() => {
        const id = localStorage.getItem("client_key");
        if (id) {
            setIdUsuarioLocal(id);
        }
    }, []);

    useEffect(() => {
        const adicionarUsuarioNaMesa = async () => {
            if (!idUsuarioLocal || isUserAdded) return; // Certifique-se de que `idUsuarioLocal` está definido e o usuário ainda não foi adicionado

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/mesas/${mesaId}/usuarios/${idUsuarioLocal}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    setIsUserAdded(true); // Marque que o usuário foi adicionado
                    setRefreshKey(prevKey => prevKey + 1); // Força a atualização da lista de jogadores
                } else {
                    console.error('Erro ao adicionar usuário à mesa');
                }
            } catch (error) {
                console.error('Erro na requisição para adicionar usuário à mesa', error);
            }
        };

        if (idUsuarioLocal) {
            adicionarUsuarioNaMesa();
        }
    }, [mesaId, idUsuarioLocal, isUserAdded]);

    

    useEffect(() => {
        const removerUsuarioDaMesa = async () => {
            if (!idUsuarioLocal) return;

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/mesas/${mesaId}/usuarios/${idUsuarioLocal}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    console.error('Erro ao remover usuário da mesa');
                }
            } catch (error) {
                console.error('Erro na requisição para remover usuário da mesa', error);
            }
        };

        const handleBeforeUnload = () => {
            removerUsuarioDaMesa();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            removerUsuarioDaMesa();
        };
    }, [mesaId, idUsuarioLocal]);

    return (
        <main>
            <Sidebar>
                <Jogadores mesaId={Number(mesaId)} key={refreshKey} />
                <Biblioteca />
            </Sidebar>
            <Chat mesaId={Number(mesaId)}/>
        </main>
    );
};

export default Mesa;
