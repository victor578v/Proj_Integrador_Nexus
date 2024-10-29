import React from 'react';
import Link from 'next/link';
import './page.css';
import Sidebar from '@/components/Sidebar/sidebar';
import Jogadores from '@/components/Jogadores/jogadores';
import Biblioteca from '@/components/Biblioteca/biblioteca';
import Chat from '@/components/Chat/chat';

const Mesa = ({ children }) => { // Adicione { children } como argumento
    return (
        <main>
            <Sidebar>
                <Jogadores/>
                <Biblioteca/>    
             </Sidebar>
            <Chat/>
        </main>
    );
};

export default Mesa;