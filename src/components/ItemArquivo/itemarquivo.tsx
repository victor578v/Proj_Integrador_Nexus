import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { ArquivoI } from "@/utils/types/arquivos";
import { toast } from "sonner";
import Swal from "sweetalert2";
import "./itemarquivo.css";

const ItemArquivo = ({
    arquivo,
    isDonoMesa,
    mesaId, // Recebe mesaId para usar na rota DELETE
}: {
    arquivo: ArquivoI;
    isDonoMesa: boolean;
    mesaId: number; // Id da mesa para a rota DELETE
}) => {
    const [modalAberto, setModalAberto] = useState(false);
    const [conteudo, setConteudo] = useState(arquivo.conteudo);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const salvarConteudo = async (conteudo: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/arquivos/${arquivo.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ conteudo }),
            });

            if (response.ok) {
                toast.success("Arquivo salvo");
                console.log(conteudo);
            } else {
                console.error("Erro ao salvar o conteúdo do arquivo");
            }
        } catch (error) {
            console.error("Erro ao salvar o conteúdo do arquivo:", error);
        }
    };

    const handleConteudoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const novoConteudo = e.target.value;

        setConteudo(novoConteudo);

        if (timer) clearTimeout(timer);

        const novoTimer = setTimeout(() => {
            salvarConteudo(novoConteudo);
        }, 5000);

        setTimer(novoTimer);
    };

    const excluirArquivo = async () => {
        // Exibe a confirmação de exclusão
        const confirmacao = await Swal.fire({
            title: "Você tem certeza?",
            text: "Essa ação não pode ser desfeita!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar",
        });

        if (confirmacao.isConfirmed) {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/arquivos/arquivos/${arquivo.id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    toast.success("Arquivo excluído com sucesso");
                } else {
                    toast.error("Erro ao excluir o arquivo");
                }
            } catch (error) {
                console.error("Erro ao excluir o arquivo:", error);
                toast.error("Erro ao excluir o arquivo");
            }
        }
    };

    return (
        <>
            <div className="arquivo">
                <div className="arquivo-inside" onClick={() => setModalAberto(true)}>
                    <img src="/img/file.svg" alt="arquivo" />
                    <h3>{arquivo.nome}</h3>
                </div>
                <button
                    onClick={excluirArquivo}
                    className={isDonoMesa ? "" : "invisivel"}
                >
                    <i className="bi bi-trash-fill"></i>
                </button>
            </div>

            <Modal open={modalAberto} onClose={() => setModalAberto(false)} center classNames={{ modal: 'arquivo-modal' }}>
                <h2 className="arquivo-modal-title">{arquivo.nome}</h2>

                {isDonoMesa ? (
                    <>
                        <textarea
                            value={conteudo}
                            onChange={handleConteudoChange}
                            className="arquivo-modal-textarea"
                        ></textarea>
                        <p className="arquivo-modal-message">Alterações serão salvas automaticamente após 5 segundos.</p>
                    </>
                ) : (
                    <h2 className="arquivo-modal-content">{conteudo}</h2>
                )}
            </Modal>
        </>
    );
};

export default ItemArquivo;
