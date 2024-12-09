"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./navbar.css";
import { usePathname } from "next/navigation";
import { useUsuarioStore } from "@/context/usuario";
import { Modal } from "react-responsive-modal";
import { MesaI } from "@/utils/types/mesas";
import { ImagemI } from "@/utils/types/imagens";

export function Navbar() {
    const pathname = usePathname();
    const isMesaPage = pathname.startsWith("/mesa");
    const { usuario, logaUsuario, deslogaUsuario } = useUsuarioStore();

    // Estado para armazenar o nome da mesa e os dados da mesa
    const [nomeMesa, setNomeMesa] = useState<string | null>(null);
    const [mesa, setMesa] = useState<MesaI | null>(null);
    const [imagemMesa, setImagemMesa] = useState<ImagemI | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Controle de abertura do modal

    useEffect(() => {
        // Função para buscar o usuário logado
        async function buscaUsuario(idUsuario: string) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/usuarios/${idUsuario}`, {
                    headers: {
                        "ngrok-skip-browser-warning": "true", // Cabeçalho para evitar o aviso do Ngrok
                    },
                });
        
                if (response.status === 200) {
                    const dados = await response.json();
                    logaUsuario(dados);
                }
            } catch (error) {
                console.error("Erro ao buscar usuário:", error);
            }
        }        

        const idUsuarioLocal = localStorage.getItem("client_key");
        if (idUsuarioLocal) {
            buscaUsuario(idUsuarioLocal);
        }

        // Função para buscar os dados da mesa
        async function buscaDadosMesa(idMesa: number) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/mesas/mesa/${idMesa}`, {
                    headers: {
                        "ngrok-skip-browser-warning": "true", // Cabeçalho para evitar o aviso do Ngrok
                    },
                });
        
                if (response.status === 200) {
                    const dados = await response.json();
                    setMesa(dados); // Armazena os dados completos da mesa
                    setNomeMesa(dados.nome); // Armazena apenas o nome da mesa
        
                    if (dados.imagemId) {
                        const imagemResponse = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/imagens/imagem/${dados.imagemId}`, {
                            headers: {
                                "ngrok-skip-browser-warning": "true", // Cabeçalho para evitar o aviso do Ngrok
                            },
                        });
        
                        if (imagemResponse.status === 200) {
                            const imagemDados = await imagemResponse.json();
                            setImagemMesa(imagemDados); // Armazenando a imagem
                        }
                    }
                }
            } catch (error) {
                console.error("Erro ao buscar dados da mesa:", error);
            }
        }
        

        // Se estiver na página de mesa, busca o id da mesa na URL
        if (isMesaPage) {
            const idMesa = pathname.split("/").pop(); // Pega o id da mesa da URL
            if (idMesa) {
                buscaDadosMesa(Number(idMesa));
            }
        }
    }, [pathname]);

    const handleLogout = () => {
        // Remove o usuário do localStorage
        localStorage.removeItem("client_key");
        // Atualiza o estado do usuário chamando deslogaUsuario
        deslogaUsuario();
        // Redireciona para a página inicial ou outra página
        window.location.href = "/";
    };

    // Função para abrir o modal de edição
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Função para fechar o modal de edição
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Função para atualizar os dados da mesa
    const handleUpdateMesa = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!mesa) return;

        const form = event.target as HTMLFormElement;
        const updatedMesa = {
            ...mesa,
            nome: form.nome.value,
            descricao: form.descricao.value,
            sistema: form.sistema.value,
            vagas: form.vagas.checked,
        };

        console.log(updatedMesa)

        // Atualizando a URL da imagem, caso tenha sido modificada
        if (form.imagemUrl.value && imagemMesa) {
            const updatedImagem = {
                ...imagemMesa,
                url: form.imagemUrl.value,
            };

            try {
                const imagemResponse = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/imagens/imagem/${imagemMesa.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "true"
                    },
                    body: JSON.stringify(updatedImagem),
                });

                if (imagemResponse.status === 200) {
                    // Atualizando a imagem no estado
                    setImagemMesa(updatedImagem);
                }
            } catch (error) {
                console.error("Erro ao atualizar a imagem:", error);
            }
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/mesas/mesa/${mesa.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true"
                },
                body: JSON.stringify(updatedMesa),
            });
            if (response.status === 200) {
                setMesa(updatedMesa);
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error("Erro ao atualizar a mesa:", error);
        }
    };


    const isUsuarioLogado = usuario.id > 0 && usuario.nome !== "";
    const isDonoMesa = mesa?.userId === usuario.id;

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
                    <div className="mesas-nav">
                        <h2>{nomeMesa ? nomeMesa : "Carregando..."}</h2>
                        {isDonoMesa && (
                            <button className="opcoes-botao" onClick={openModal}>
                                <i className="bi bi-gear-fill"></i>
                            </button>
                        )}
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
                        <button onClick={handleLogout} id="sair">
                            Sair
                        </button>
                        <Link  href={`/usuario/${usuario.id}`}>
                            <button id="mesas-usuario">Suas Mesas</button>
                        </Link>
                    </div>
                ) : (
                    <div className="login-cadastro">
                        <Link href={"/entrar"} className="link">
                            <button id="entrar">Entrar</button>
                        </Link>
                        <Link href={"/cadastrar"} className="link">
                            <button id="cadastro">Cadastre-se</button>
                        </Link>
                    </div>
                )}
            </nav>

            {/* Modal para editar a mesa */}
            {isModalOpen && mesa && (
                <Modal classNames={{
                    modal: "react-modal2",
                }} showCloseIcon={false} open={isModalOpen} onClose={closeModal}>
                    <h2>Editar Mesa</h2>
                    <form onSubmit={handleUpdateMesa}>
                        <div>
                            <label>Nome</label>
                            <input type="text" name="nome" defaultValue={mesa.nome} required />
                        </div>
                        <div>
                            <label>Descrição</label>
                            <textarea name="descricao" defaultValue={mesa.descricao} required />
                        </div>
                        <div>
                            <label>Sistema</label>
                            <input type="text" name="sistema" defaultValue={mesa.sistema} required />
                        </div>
                        <div id="imagem">
                            <label>Imagem da Mesa</label>
                            <input type="text" name="imagemUrl" defaultValue={imagemMesa?.url || ''} placeholder="URL da imagem" />
                        </div>
                        <div id="vagas">
                            <label>Há Vagas?</label>
                            <input type="checkbox" name="vagas" defaultChecked={mesa.vagas} />
                        </div>
                        <button type="submit">Salvar</button>
                    </form>
                </Modal>
            )}
        </header>
    );
}
