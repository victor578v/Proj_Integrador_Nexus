import React from 'react';
import Link from 'next/link';
import './mesasrecomendadas.css';
import ItemMesa from '../ItemMesa/itemmesa';

const MesasRecomendadas = () => {
    return (
        <div>
            <h1>Mesas Recomendadas</h1>
            <div className="cards">
                <ItemMesa />
                <ItemMesa />
                <ItemMesa />
                <ItemMesa />
            </div>
        </div>
    );
};

export default MesasRecomendadas;