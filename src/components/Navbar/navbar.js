// src/components/Navbar.js
"use client"
import React from 'react';
import Link from 'next/link'; // Se você quiser usar links do Next.js
import './navbar.css'; // Importando o CSS específico da Navbar
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();
    const isMesaPage = pathname.includes('/mesa');

    return (
        <header>
            <nav>
                <div className="logo">
                    <a href="/">
                        <img src="img/logo.png" alt=""></img>
                        <h1>NEXUS</h1>
                    </a>
                </div>
                {isMesaPage ? (
                    <div className="mesas">
                        <h2>Nome da Mesa</h2>
                    </div>
                ) : (
                    <div className="links">
                    <ul>
                        <li>Planos e Precos</li>
                        <li>Contato</li>
                        <li>Termos de Uso</li>
                    </ul>
                </div>
                )}
                <div className="login-cadastro">
                    <button id="entrar">Entrar</button>
                    <button id="cadastro">Cadastre-se</button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
