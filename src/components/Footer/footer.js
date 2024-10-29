import React from 'react';
import Link from 'next/link';
import './footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="logo">
                <a href="index.html">
                    <img src="img/logo.png" alt=""></img>
                        <h1>NEXUS</h1>
                </a>
            </div>
            <div className="links-footer">
                <ul className="footer-titulos">
                    <li>Links Rapidos</li>
                    <li>Outros</li>
                </ul>
                <ul className="footer-links">
                    <li>Home</li>
                    <li>Termos de uso</li>
                </ul>
                <ul className="footer-links">
                    <li>Planos e Precos</li>
                    <li>Contato</li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;