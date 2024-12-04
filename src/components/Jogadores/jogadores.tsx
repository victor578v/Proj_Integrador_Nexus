"use client";
import React, { useEffect, useState } from "react";
import "./jogadores.css";
import { UsuarioI } from "@/utils/types/usuarios";
import { ItemJogador } from "../ItemJogador/Itemjogador";
import { MesaI, MesaIdI } from "@/utils/types/mesas";
import { useUsuarioStore } from "@/context/usuario";
import Modal from "react-responsive-modal";
import { PersonagemI } from "@/utils/types/personagens";
import Swal from "sweetalert2";
import { toast } from "sonner";

const Jogadores: React.FC<MesaIdI> = ({ mesaId }) => {
    const [usuarios, setUsuarios] = useState<UsuarioI[]>([]);
    const { usuario } = useUsuarioStore();
    const [mesa, setMesa] = useState<MesaI | null>(null);

    // Estados para modais
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Estados gerais
    const [personagem, setPersonagem] = useState<PersonagemI | null>(null);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [nickname, setNickname] = useState<string>();
    const [vidaMaxima, setVidaMaxima] = useState<number>();
    const [vidaAtual, setVidaAtual] = useState<number>();
    const [imagemUrl, setimagemUrl] = useState<string>();

    const isDonoMesa = mesaId === usuario.id;

    const getPersonagem = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/personagens/mesa/${mesaId}/usuario/${usuario.id}`);
            if (!response.ok) throw new Error('Erro ao buscar personagem');

            const dados: PersonagemI = await response.json();
            setPersonagem(dados);
        } catch (error) {
            console.error("Erro ao buscar personagem: ", error);
            setPersonagem(null);  // Se houver erro, garantir que personagem seja null
        }
    };

    useEffect(() => {
        getPersonagem();
    }, [mesaId, usuario]); // Reexecuta a função quando o mesaId ou usuario mudar

    useEffect(() => {
        async function buscaDadosMesa(idMesa: number) {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_URL_API}/mesas/mesa/${idMesa}`
                );
                if (response.status === 200) {
                    const dados = await response.json();
                    setMesa(dados); // Armazena os dados completos da mesa
                }
            } catch (error) {
                console.error("Erro ao buscar dados da mesa:", error);
            }
        }

        buscaDadosMesa(mesaId);
    }, []); // Dependências vazias para executar apenas uma vez

    const getDadosUsuarios = async () => {
        if (!mesaId) return; // Se não houver mesaId, não faz nada

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL_API}/mesas/${mesaId}/usuarios`
            );
            if (!response.ok) throw new Error("Erro ao buscar usuários");

            const dados: UsuarioI[] = await response.json(); // Tipando os dados como uma lista de usuários
            setUsuarios(dados); // Atualiza o estado dos usuários
        } catch (error) {
            console.error("Erro ao buscar usuários: ", error);
        }
    };

    useEffect(() => {
        getDadosUsuarios();
    }, []);

    // Atualiza automaticamente a lista de usuários
    useEffect(() => {
        const intervalId = setInterval(() => {
            getDadosUsuarios();
        }, 4000); // 1000ms = 1 segundo

        return () => {
            clearInterval(intervalId); // Limpa o intervalo para evitar vazamentos de memória
        };
    }, [mesaId]);

    // Handle adicionar personagem
    const handleAddPersonagem = async () => {
        if (!mesaId || !selectedUserId) {
            alert("Selecione um usuário e certifique-se de que a mesa está válida.");
            return;
        }

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL_API}/usuarios/adicionar-personagem/${mesaId}/${selectedUserId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nickname,
                        vidaMaxima,
                        vidaAtual,
                        imagemUrl,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Erro ao adicionar personagem.");
            }

            toast.success("Personagem adicionado com sucesso!");
            setIsAddModalOpen(false);
            setNickname("");
            setVidaMaxima(0);
            setVidaAtual(0);
            setimagemUrl("");
            setSelectedUserId(null);
        } catch (error) {
            console.error("Erro ao adicionar personagem: ", error);
            toast.error("Erro ao adicionar personagem.");
        }
    };

    const handleOpenEditModal = () => {
        if (personagem) {
            // Preencha os campos do formulário com os dados do personagem existente
            setNickname(personagem.nickname || "");
            setVidaMaxima(personagem.vidaMaxima || 0);
            setVidaAtual(personagem.vidaAtual || 0);
            setimagemUrl(personagem.imagem.url || "");
        }
        setIsEditModalOpen(true); // Abra o modal de edição
    };

    const handleCloseEditModal = () => {
        if (personagem) {
            // Preencha os campos do formulário com os dados do personagem existente
            setNickname("");
            setVidaMaxima(0);
            setVidaAtual(0);
            setimagemUrl("");
        }
        setIsEditModalOpen(true); // Abra o modal de edição
    };


    // Handle modificar personagem
    const handleEditPersonagem = async () => {
        if (!usuario.id) {
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Você não está logado para modificar um personagem.",
            });
            return;
        }

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL_API}/usuarios/modificar-personagem/${mesaId}/${usuario.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nickname,
                        vidaMaxima,
                        vidaAtual,
                        imagemUrl,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Erro ao modificar personagem.");
            }

            toast.success("Personagem modificado com sucesso!");
            setIsEditModalOpen(false);
        } catch (error) {
            console.error("Erro ao modificar personagem: ", error);
            toast.error("Erro ao modificar personagem.");
        }
    };

    // Handle excluir personagem
    const handleDeletePersonagem = async () => {
        if (!selectedUserId) {
            Swal.fire({
                icon: 'warning',
                title: 'Seleção de Usuário',
                text: 'Selecione um usuário para excluir o personagem.',
                confirmButtonText: 'OK',
            });
            return;
        }

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_URL_API}/usuarios/excluir-personagem/${mesaId}/${selectedUserId}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Erro ao excluir personagem.");
            }

            toast.success("Personagem excluído com sucesso!");
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error("Erro ao excluir personagem: ", error);
            toast.error("Erro ao excluir personagem.");
        }
    };

    const listaUsuarios = usuarios.map((usuario) => (
        <ItemJogador dataUsuarios={usuario} key={usuario.id} mesaId={mesaId} />
    ));

    const usuarioOptions = usuarios.map((usuario) => (
        <option key={usuario.id} value={usuario.id}>
            {usuario.nome}
        </option>
    ));

    return (
        <div>
            <div className="personagens">
                {isDonoMesa && (
                    <>
                        <button onClick={() => setIsAddModalOpen(true)}>Adicionar Personagem</button>
                        <button onClick={() => setIsDeleteModalOpen(true)}>Excluir Personagem</button>
                    </>
                )}
                <button onClick={handleOpenEditModal}>Modificar Personagem</button>
            </div>
            <div className="jogadores">{listaUsuarios}</div>

            {/* Modal Adicionar */}
            <Modal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} center>
                <h2>Adicionar Personagem</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAddPersonagem();
                        setIsAddModalOpen(false)
                    }}
                >
                    <div>
                        <label htmlFor="usuario">Usuário:</label>
                        <select
                            id="usuario"
                            value={selectedUserId || ""}
                            onChange={(e) => setSelectedUserId(Number(e.target.value))}
                        >
                            <option value="" disabled>
                                Selecione um usuário
                            </option>
                            {usuarioOptions}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="nickname">Nome do Personagem:</label>
                        <input
                            id="nickname"
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="vidaMaxima">Vida Máxima:</label>
                        <input
                            id="vidaMaxima"
                            type="number"
                            value={vidaMaxima}
                            onChange={(e) => setVidaMaxima(Number(e.target.value))}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="vidaAtual">Vida Atual:</label>
                        <input
                            id="vidaAtual"
                            type="number"
                            value={vidaAtual}
                            onChange={(e) => setVidaAtual(Number(e.target.value))}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="imagemUrl">Url da Imagem:</label>
                        <input
                            id="imagemUrl"
                            type="text"
                            value={imagemUrl}
                            onChange={(e) => setimagemUrl(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Adicionar</button>
                </form>
            </Modal>

            {/* Modal Modificar */}
            <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} center>
                <h2>Modificar Personagem</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleEditPersonagem();
                        setIsAddModalOpen(false)
                    }}
                >
                    <div>
                        <label htmlFor="nickname">Nome do Personagem:</label>
                        <input
                            id="nickname"
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="vidaMaxima">Vida Máxima:</label>
                        <input
                            id="vidaMaxima"
                            type="number"
                            value={vidaMaxima}
                            onChange={(e) => setVidaMaxima(Number(e.target.value))}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="vidaAtual">Vida Atual:</label>
                        <input
                            id="vidaAtual"
                            type="number"
                            value={vidaAtual}
                            onChange={(e) => setVidaAtual(Number(e.target.value))}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="imagemUrl">Url da Imagem:</label>
                        <input
                            id="imagemUrl"
                            type="text"
                            value={imagemUrl}
                            onChange={(e) => setimagemUrl(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">
                        Modificar
                    </button>
                </form>

            </Modal>

            {/* Modal Excluir */}
            <Modal open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} center>
                <h2>Excluir Personagem</h2>
                <select
                    id="usuario"
                    value={selectedUserId || ""}
                    onChange={(e) => setSelectedUserId(Number(e.target.value))}
                >
                    <option value="" disabled>
                        Selecione um usuário
                    </option>
                    {usuarioOptions}
                </select>
                <button type="button" onClick={handleDeletePersonagem}>
                    Excluir
                </button>
            </Modal>
        </div>
    );
};

export default Jogadores;