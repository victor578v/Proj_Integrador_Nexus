import React, { ReactNode } from 'react';
import './sidebar.css';

interface MesasProps {
    children: ReactNode; // Tipando 'children' como ReactNode
  }

  const Sidebar: React.FC<MesasProps> = ({ children }) => { 
    return (
            <section className="jogadores-biblioteca">
                {children}
            </section>
    );
};

export default Sidebar;