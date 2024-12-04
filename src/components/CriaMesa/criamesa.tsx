import React, { useState } from 'react';
import Link from 'next/link';
import { Modal } from 'react-responsive-modal'; // Importando o modal
import SweetAlert from 'sweetalert2';
import 'react-responsive-modal/styles.css'; // Importando os estilos do modal
import './criamesa.css';
import { useUsuarioStore } from '@/context/usuario';

const CriaMesa = () => {
    const { usuario } = useUsuarioStore(); // Verificar se o usuário está logado
    const [imagem, setImagem] = useState<string | null>(null);
    const [nome, setNome] = useState('');
    const [sistema, setSistema] = useState('');
    const [senha, setSenha] = useState('');
    const [descricao, setDescricao] = useState('');
    const [vagas, setVagas] = useState<boolean | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado do modal

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!usuario.id) {
            SweetAlert.fire({
                icon: 'warning',
                title: 'Você precisa estar logado',
                text: 'Faça login para criar uma mesa!',
            });
            return;
        }

        console.log(vagas)

        if (!nome || !sistema || !descricao || !imagem) {
            SweetAlert.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Por favor, preencha todos os campos obrigatórios!',
            });
            return;
        }

        const mesaData = {
            nome,
            sistema,
            descricao,
            vagas,
            userId: usuario.id,
            imagemUrl: imagem,
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/mesas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(mesaData),
            });

            if (!response.ok) {
                throw new Error('Falha ao criar mesa');
            }

            const data = await response.json();

            SweetAlert.fire({
                icon: 'success',
                title: 'Mesa Criada',
                text: 'Sua mesa foi criada com sucesso!',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = `/mesa/${data.id}`;
                }
            });
        } catch (error) {
            SweetAlert.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Houve um erro ao criar a mesa.',
            });
        }
    };


    return (
        <div>
            <h1>Crie sua própria mesa virtual!</h1>
            <div className="criar-mesa">
                <form onSubmit={handleSubmit}>
                    <div className="imagem" onClick={() => setIsModalOpen(true)}>
                        <h2>Adicione uma imagem</h2>
                        <img src={imagem || '/img/placeholder.webp'} alt="Imagem da Mesa" />
                    </div>

                    <div className="info-basica">
                        <div className="componente">
                            <label htmlFor="nome">
                                <h3>Nome da mesa</h3>
                            </label>
                            <input
                                type="text"
                                id="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </div>
                        <div className="componente">
                            <label htmlFor="sistema">
                                <h3>Sistema da mesa</h3>
                            </label>
                            <input
                                type="text"
                                id="sistema"
                                value={sistema}
                                onChange={(e) => setSistema(e.target.value)}
                            />
                        </div>
                        <div className="componente">
                            <label htmlFor="senha">
                                <h3>Senha (Opcional)</h3>
                            </label>
                            <input
                                type="text"
                                id="senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                        </div>
                        <div className="vagas">
                            <h3>Há vagas?</h3>
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        name="vagas"
                                        value="sim"
                                        checked={vagas === true}
                                        onChange={() => setVagas(true)}
                                    />
                                    <h5>Sim</h5>
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="vagas"
                                        value="nao"
                                        checked={vagas === false}
                                        onChange={() => setVagas(false)}
                                    />
                                    <h5>Não</h5>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="descricao">
                        <label htmlFor="descricao">Descrição da mesa</label>
                        <textarea
                            name="descricao"
                            id="descricao"
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                        ></textarea>
                        <button type="submit">Criar mesa</button>
                    </div>

                </form>
            </div>

            <Modal classNames={{
                modal: "react-modal",
            }} showCloseIcon={false} open={isModalOpen} onClose={() => setIsModalOpen(false)} center >
                <p>Insira a URL da imagem:</p>
                <input
                    type="text"
                    placeholder="URL da imagem"
                    onBlur={(e) => setImagem(e.target.value)}
                />
                <button onClick={() => setIsModalOpen(false)}>Fechar</button>
            </Modal>
        </div>
    );
};

export default CriaMesa;
