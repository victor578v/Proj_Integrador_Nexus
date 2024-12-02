"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2"; // Importa o SweetAlert2
import './page.css';

type Inputs = {
    nome: string;
    email: string;
    senha: string;
};

export default function Cadastrar() {
    const { register, handleSubmit } = useForm<Inputs>();
    const router = useRouter();

    async function verificaCadastro(data: Inputs) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/usuarios/cadastro`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        });

        if (response.status === 201) {
            Swal.fire({
                icon: "success",
                title: "Sucesso",
                text: "Cadastro realizado com sucesso!",
                confirmButtonText: "Ir para login",
            }).then(() => {
                // Redireciona para a página de login após cadastro bem-sucedido
                router.push("/entrar");
            });
        } else {
            const error = await response.json();
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: error.erro || "Erro ao cadastrar usuário",
                confirmButtonText: "Tentar novamente",
            });
        }
    }

    return (
        <main className="cadastrar-container">
            <div className="cadastrar-box">
                <h1>Cadastrar</h1>
                <form className="cadastrar-form" onSubmit={handleSubmit(verificaCadastro)}>
                    <label htmlFor="nome">Nome:</label>
                    <input type="text" id="nome" required {...register("nome")} />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" required {...register("email")} />

                    <label htmlFor="senha">Senha:</label>
                    <input type="password" id="senha" required {...register("senha")} />

                    <button type="submit">Cadastrar</button>
                </form>
                <p className="login-link">Já tem uma conta? <a href="/entrar">Entre</a></p>
            </div>
        </main>
    );
}
