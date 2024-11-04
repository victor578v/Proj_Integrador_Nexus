import React from 'react';
import Link from 'next/link';
import './criamesa.css';

const CriaMesa = () => {
    return (
        <div>
            <h1>Crie sua propria mesa virtual!</h1>
            <div className="criar-mesa">
                <form action="">
                    <div className="imagem">
                        <h2>Adicione uma imagem</h2>
                        <img src="img/placeholder.webp" alt=""/>
                        <button>Criar mesa</button>
                    </div>
                    <div className="info-basica">
                        <div className="componente">
                            <label htmlFor="nome">
                                <h3>Nome da mesa</h3>
                            </label>
                            <input type="text" id="nome"/>
                        </div>
                        <div className="componente">
                            <label htmlFor="sistema">
                                <h3>Sistema da mesa</h3>
                            </label>
                            <input type="text" id="sistema"/>
                        </div>
                        <div className="componente">
                            <label htmlFor="senha">
                                <h3>Senha (Opcional)</h3>
                            </label>
                            <input type="text" id="senha"/>
                        </div>
                        <div className="vagas">
                            <h3>Há vagas?</h3>
                            <div>
                                <label>
                                    <input type="radio" name="vagas" value="sim"/>
                                    <h5>Sim</h5>
                                </label>
                                <label>
                                    <input type="radio" name="vagas" value="nao"/>
                                    <h5>Nao</h5>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="descricao">
                        <label htmlFor="descricao">Descricao da mesa</label>
                        <textarea name="descricao" id="descricao"></textarea>
                        <button>Criar mesa</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CriaMesa;