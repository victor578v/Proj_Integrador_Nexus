"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Modal } from 'react-responsive-modal';
import "react-responsive-modal/styles.css";
import './itemmesa.css';
import { MesaI } from '@/utils/types/mesas';

export function ItemMesa({ dataMesas }: { dataMesas: MesaI }) {
    const router = useRouter();

    // Estado para o modal de senha e para a senha digitada
    const [isModalAberto, setIsModalAberto] = useState(false);
    const [senha, setSenha] = useState('');
    const [erroSenha, setErroSenha] = useState(false);

    const donoOnline = Array.isArray(dataMesas.usuarios)
        ? dataMesas.usuarios.some((usuario) => usuario.id === dataMesas.userId)
        : false;

    // Função para abrir o modal se a mesa tiver senha
    const handleEntrar = () => {
        if (dataMesas.senha) {
            // Se a mesa tem senha, abre o modal
            setIsModalAberto(true);
        } else {
            // Caso não tenha senha, entra diretamente
            router.push(`/mesa/${dataMesas.id}`);
        }
    };

    // Função para validar a senha
    const validarSenha = () => {
        if (senha === dataMesas.senha) {
            // Se a senha estiver correta, entra na mesa
            router.push(`/mesa/${dataMesas.id}`);
            setIsModalAberto(false); // Fecha o modal
        } else {
            // Se a senha estiver incorreta, exibe erro
            setErroSenha(true);
        }
    };

    return (
        <div className="card">
            <div id="div1">
                <img src={dataMesas.imagem.url} alt={"Imagem da mesa " + dataMesas.nome} />
                <div id="div2">
                    <h2>{dataMesas.nome}</h2>
                    <h3>{dataMesas.sistema}</h3>
                </div>
            </div>
            <h4>{dataMesas.descricao}</h4>
            <div id="div3">
                {/* Exibe se há vagas com classe condicional */}
                <h5 id="vagas" className={!dataMesas.vagas ? "invisivel" : ""}>
                    Há Vagas
                </h5>
                {/* Exibe se o dono está online com classe condicional */}
                <h5 id="onlineMestre" className={!donoOnline ? "invisivel" : ""}>
                    Mestre Online
                </h5>
                {/* Botão que chama a função de navegação */}
                <button onClick={handleEntrar}>Entrar</button>
            </div>

            {/* Modal para digitar a senha */}
            <Modal
                open={isModalAberto}
                onClose={() => setIsModalAberto(false)}
                center
                classNames={{ modal: 'customizado-modal' }}
            >
                <div className='senha-div'>
                    <h2 className='senha-titulo'>Digite a Senha</h2>
                    <input
                        type="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        placeholder="Digite a senha da mesa"
                        className="senha-input"
                    />
                    <button className='senha-botao' onClick={validarSenha}>Entrar</button>
                </div>
                {erroSenha && <p style={{ color: 'red' }}>Senha incorreta, tente novamente!</p>}
            </Modal>
        </div>
    );
}


