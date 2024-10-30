import React from 'react';
import Link from 'next/link';
import './mesasdestaque.css';
import ItemMesa from '../ItemMesa/itemmesa';

const MesasDestaque = () => {
    return (
        <div>
            <h1>Mesas Em Destaque</h1>
            <div className="cards">
                <ItemMesa />
                <ItemMesa />
                <ItemMesa />
                <ItemMesa />
            </div>
        </div>
    );
};

export default MesasDestaque;