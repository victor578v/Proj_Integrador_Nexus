import React, { ReactNode } from 'react';
import './mesas.css';

interface MesasProps {
  children: ReactNode; // Tipando 'children' como ReactNode
}

const Mesas: React.FC<MesasProps> = ({ children }) => { 
  return (
    <section className="mesas"> 
      {children}
    </section>
  );
};

export default Mesas;
