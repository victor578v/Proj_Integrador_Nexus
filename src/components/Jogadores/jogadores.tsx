"use client"
import React, { useEffect, useState } from 'react';
import './jogadores.css';
import { UsuarioI } from '@/utils/types/usuarios';
import { ItemJogador } from '../ItemJogador/Itemjogador';
import { MesaIdI } from '@/utils/types/mesas';

const Jogadores: React.FC<MesaIdI> = ({ mesaId }) => {
    const [usuarios, setUsuarios] = useState<UsuarioI[]>([]);

    useEffect(() => {
        const getDadosUsuarios = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/mesas/${mesaId}/usuarios`);
                if (!response.ok) throw new Error('Erro ao buscar usuários');
                
                const dados = await response.json();
                console.log(dados);
                setUsuarios(dados);
            } catch (error) {
                console.error(error);
            }
        };

        if (mesaId) getDadosUsuarios();
    }, [mesaId]);

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
