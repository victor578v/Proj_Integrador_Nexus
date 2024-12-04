import React, { useState } from "react";
import "./itemmensagem.css";
import { MensagemI } from "@/utils/types/mensagens";
import { PersonagemI } from "@/utils/types/personagens";
import { useUsuarioStore } from "@/context/usuario";
import Swal from "sweetalert2"; // Importando o SweetAlert2
import { toast } from "sonner";

export function ItemMensagem({ dataMensagem }: { dataMensagem: MensagemI; }) {
  const { usuario } = useUsuarioStore(); // Usuário logado

  const deletarMensagem = async () => {
    // Usando SweetAlert para confirmar a exclusão
    const result = await Swal.fire({
      title: "Tem certeza que deseja deletar esta mensagem?",
      text: "Esta ação não pode ser desfeita.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_API}/mesas/${dataMensagem.id}/${usuario.id}`,
          { method: "DELETE" }
        );

        if (!response.ok) {
          throw new Error("Erro ao deletar a mensagem");
        }

        toast.success("Mensagem deletada com sucesso!", {
          duration: 3000, // Define o tempo que a notificação vai durar (em milissegundos)
          position: "top-center", // Posiciona a notificação no topo da tela
        });

      } catch (error) {
        console.error("Erro ao deletar mensagem:", error);

        // Usando SweetAlert para notificar erro
        toast.error("Erro ao deletar a mensagem. Tente novamente.", {
          duration: 3000,
          position: "top-center",
        });
      }
    }
  };

  const personagem = dataMensagem.autor.personagens.find(
    (personagem: PersonagemI) => personagem.mesaId == dataMensagem.mesaId
  );

  return (
    <div className="mensagem">
      <div className="identificadores">
        <h2>{dataMensagem.autor.nome === "sistema" ? "Sistema" : (personagem ? personagem.nickname : "Sem Personagem")}</h2>
        <h3>{dataMensagem.autor.nome === "sistema" ? "" : dataMensagem.autor.nome}</h3>
        {usuario.id === dataMensagem.userId && (
          <button className="btn-deletar" onClick={deletarMensagem}>
            🗑️ Deletar
          </button>
        )}
      </div>
      <h1>{dataMensagem.conteudo}</h1>
    </div>
  );  
}
