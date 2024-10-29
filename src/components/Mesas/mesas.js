import React from 'react';
import Link from 'next/link';
import './mesas.css';

const Mesas = ({ children }) => { // Adicione { children } como argumento
    return (
        <section className="mesas"> {/* Use className em vez de class */}
            {children}
        </section>
    );
};

export default Mesas;
