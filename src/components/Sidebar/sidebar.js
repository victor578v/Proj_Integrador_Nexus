import React from 'react';
import Link from 'next/link';
import './sidebar.css';

const Sidebar = ({ children }) => { // Adicione { children } como argumento
    return (
            <section className="jogadores-biblioteca">
                {children}
            </section>
    );
};

export default Sidebar;