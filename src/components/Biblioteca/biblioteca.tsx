import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import ItemArquivo from "../ItemArquivo/itemarquivo";
import "./biblioteca.css";
import { ArquivoI } from "@/utils/types/arquivos";

const Biblioteca = ({ mesaId, isDonoMesa }: { mesaId: number, isDonoMesa: boolean }) => {
    const [arquivos, setArquivos] = useState<ArquivoI[]>([]);
    const [arquivosFiltrados, setArquivosFiltrados] = useState<ArquivoI[]>([]);
    const [nome, setNome] = useState<string>("");
    const [modalAberto, setModalAberto] = useState<boolean>(false);
    const [pesquisa, setPesquisa] = useState<string>("");

    const getDadosArquivos = async () => {
        fetch(`${process.env.NEXT_PUBLIC_URL_API}/arquivos/mesas/${mesaId}/arquivos`)
            .then((res) => res.json())
            .then((data: ArquivoI[]) => {
                setArquivos(data);
                setArquivosFiltrados(data);
            })
            .catch((error) => console.error("Erro ao buscar arquivos:", error));
    };

    useEffect(() => {
        getDadosArquivos()
    }, []);
    // Atualiza automaticamente a lista de usuários
    useEffect(() => {
        const intervalId = setInterval(() => {
            getDadosArquivos();
        }, 4000); // 1000ms = 1 segundo

        return () => {
            clearInterval(intervalId); // Limpa o intervalo para evitar vazamentos de memória
        };
    }, [mesaId]);

    const adicionarArquivo = async () => {
        if (!nome) return;

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/arquivos/mesas/${mesaId}/arquivos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nome, conteudo: "" }),
            });

            if (response.ok) {
                const novoArquivo: ArquivoI = await response.json();
                setArquivos((prevArquivos) => [...prevArquivos, novoArquivo]);
                setArquivosFiltrados((prevArquivosFiltrados) => [...prevArquivosFiltrados, novoArquivo]);
                setNome("");
                setModalAberto(false);
            } else {
                console.error("Erro ao adicionar arquivo");
            }
        } catch (error) {
            console.error("Erro ao adicionar arquivo:", error);
        }
    };

    const handlePesquisa = (e: React.ChangeEvent<HTMLInputElement>) => {
        const texto = e.target.value;
        setPesquisa(texto);

        const arquivosFiltrados = arquivos.filter((arquivo) =>
            arquivo.nome.toLowerCase().includes(texto.toLowerCase())
        );
        setArquivosFiltrados(arquivosFiltrados);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="biblioteca">
            <div className="biblioteca-interior">
            <div className="pesquisa">
                    <form onSubmit={handleSubmit}>
                        <img src="/img/search.svg" alt="pesquisar" />
                        <input
                            type="text"
                            id="pesquisa"
                            name="pesquisa"
                            placeholder="Buscar arquivos por nome..."
                            value={pesquisa}
                            onChange={handlePesquisa}
                        />
                    </form>
                    {isDonoMesa && (
                        <button
                            type="button"
                            onClick={() => setModalAberto(true)}
                        >
                            +
                        </button>
                    )}
                </div>

                <div className="arquivos">
                    {arquivosFiltrados.map((arquivo) => (
                        <ItemArquivo key={arquivo.id} arquivo={arquivo} isDonoMesa={isDonoMesa} mesaId={mesaId} />
                    ))}
                </div>

                <Modal
                    open={modalAberto}
                    onClose={() => setModalAberto(false)}
                    center
                >
                    <h2>Adicionar Arquivo</h2>
                    <input
                        type="text"
                        placeholder="Nome do arquivo"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "15px",
                        }}
                    />
                    <button
                        type="button"
                        onClick={adicionarArquivo}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        Adicionar
                    </button>
                </Modal>
            </div>
        </div>
    );
};

export default Biblioteca;
