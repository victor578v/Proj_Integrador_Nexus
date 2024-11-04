"use client"
import React, { useEffect } from 'react';
import Link from 'next/link';
import './navbar.css';
import { usePathname } from 'next/navigation';
import { useUsuarioStore } from '@/context/usuario';

export function Navbar() {
    const pathname = usePathname();
    const isMesaPage = pathname.includes('/mesa');
    const { usuario, logaUsuario, deslogaUsuario } = useUsuarioStore();

    useEffect(() => {
        async function buscaUsuario(idUsuario: string) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/usuarios/${idUsuario}`);
                if (response.status === 200) {
                    const dados = await response.json();
                    logaUsuario(dados);
                }
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
            }
        }

        const idUsuarioLocal = localStorage.getItem("client_key");
        if (idUsuarioLocal) {
            buscaUsuario(idUsuarioLocal);
        }
    }, []);

    const handleLogout = () => {
        // Remove o usuário do localStorage
        localStorage.removeItem("client_key");
        // Atualiza o estado do usuário chamando deslogaUsuario
        deslogaUsuario(); 
        // Redireciona para a página inicial ou outra página
        window.location.href = '/';
    };

    const isUsuarioLogado = usuario.id > 0 && usuario.nome !== '';

    return (
        <header>
            <nav>
                <div className="logo">
                    <a href="/">
                        <img src="/img/logo.png" alt="Logo Nexus" />
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
                            <li>Planos e Preços</li>
                            <li>Contato</li>
                            <li>Termos de Uso</li>
                        </ul>
                    </div>
                )}
                {isUsuarioLogado ? (
                    <div className="usuario-logado">
                        <h2>{`Olá, ${usuario.nome}`}</h2>
                        <button onClick={handleLogout} id="sair">Sair</button>
                    </div>
                ) : (
                    <div className="login-cadastro">
                        <Link href={'/entrar'} className="link">
                            <button id="entrar">Entrar</button>
                        </Link>
                        <Link href={'/cadastro'} className="link">
                            <button id="cadastro">Cadastre-se</button>
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    );
}
