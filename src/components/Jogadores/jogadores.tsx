"use client"
import React, { useEffect, useState } from 'react';
import './jogadores.css';
import { UsuarioI } from '@/utils/types/usuarios';
import { ItemJogador } from '../ItemJogador/Itemjogador';
import { MesaIdI } from '@/utils/types/mesas';

const Jogadores: React.FC<MesaIdI> = ({ mesaId }) => {
    const [usuarios, setUsuarios] = useState<UsuarioI[]>([]);

    const getDadosUsuarios = async () => {
        if (!mesaId) return; // Se não houver mesaId, não faz nada

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL_API}/mesas/${mesaId}/usuarios`
            );
            if (!response.ok) throw new Error('Erro ao buscar usuários');
            
            const dados: UsuarioI[] = await response.json(); // Tipando os dados como uma lista de usuários
            setUsuarios(dados);  // Atualiza o estado dos usuários
        } catch (error) {
            console.error("Erro ao buscar usuários: ", error);
        }
    };

    // Configura o intervalo de 1 segundo para recuperar os usuários repetidamente
    useEffect(() => {
        const intervalId = setInterval(() => {
            getDadosUsuarios(); // Recupera os dados dos usuários a cada segundo
        }, 1000); // 1000ms = 1 segundo

        // Limpeza do intervalo quando o componente for desmontado ou o mesaId mudar
        return () => {
            clearInterval(intervalId); // Limpa o intervalo para evitar vazamentos de memória
        };
    }, [mesaId]);  // Reexecuta se mesaId mudar

    const listaUsuarios = usuarios.map(usuario => (
        <ItemJogador dataUsuarios={usuario} key={usuario.id} mesaId={mesaId} />
    ));

    return (
        <div className="jogadores">
            {listaUsuarios}
        </div>
    );
};

export default Jogadores;
