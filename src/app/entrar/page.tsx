"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useUsuarioStore } from "@/context/usuario";
import Swal from "sweetalert2"; // Importa o SweetAlert2
import './page.css';

type Inputs = {
    email: string;
    senha: string;
};

export default function Entrar() {
    const { register, handleSubmit } = useForm<Inputs>();
    const { logaUsuario } = useUsuarioStore();
    const router = useRouter();

    async function verificaLogin(data: Inputs) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/usuarios/login`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ email: data.email, senha: data.senha }),
        });

        if (response.status === 200) {
            const dados = await response.json();
            logaUsuario(dados);

            localStorage.setItem("client_key", dados.id);

            // Redireciona o usuário para a página inicial após o login bem-sucedido
            router.push("/");
        } else {
            // Exibe um alerta SweetAlert personalizado para erro de login
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Login ou Senha incorretos",
                confirmButtonText: "Tentar novamente",
            });
        }
    }

    return (
        <main className="entrar-container">
            <div className="entrar-box">
                <h1>Entrar</h1>
                <form className="entrar-form" onSubmit={handleSubmit(verificaLogin)}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" required {...register("email")} />

                    <label htmlFor="senha">Senha:</label>
                    <input type="password" id="senha" required {...register("senha")} />

                    <button type="submit">Entrar</button>
                </form>
                <p className="signup-link">Não tem uma conta? <a href="/signup">Cadastre-se</a></p>
            </div>
        </main>
    );
}
