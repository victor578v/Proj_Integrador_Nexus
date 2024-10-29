import React from 'react';
import Link from 'next/link';
import './biblioteca.css';

const Biblioteca = () => {
    return (
        <>
            <div className="biblioteca">

                <div className="biblioteca-interior">
                    <div className="pesquisa">
                        <form>
                            <img src="img/search.svg" alt="pesquisar" />
                            <input type="text" id="pesquisa" name="pesquisa"
                                placeholder="Buscar mesas por nome ou sistema..." />
                        </form>

                        <button>+</button>
                    </div>

                    <div className="arquivos">
                        <div className="arquivo">
                            <img src="/img/file.svg" alt="arquivo" />
                            <h3>Sou um Arquivo</h3>
                        </div>

                        <div className="arquivo">
                            <img src="/img/file.svg" alt="arquivo" />
                            <h3>Sou um Arquivo</h3>
                        </div>

                        <div className="arquivo">
                            <img src="/img/file.svg" alt="arquivo" />
                            <h3>Sou um Arquivo</h3>
                        </div>

                        <div className="arquivo">
                            <img src="/img/file.svg" alt="arquivo" />
                            <h3>Sou um Arquivo</h3>
                        </div>

                        <div className="arquivo">
                            <img src="/img/file.svg" alt="arquivo" />
                            <h3>Sou um Arquivo</h3>
                        </div>

                        <div className="arquivos">
                            <div className="arquivo">
                                <img src="/img/file.svg" alt="arquivo" />
                                <h3>Sou um Arquivo</h3>
                            </div>

                            <div className="arquivo">
                                <img src="/img/file.svg" alt="arquivo" />
                                <h3>Sou um Arquivo</h3>
                            </div>

                            <div className="arquivo">
                                <img src="/img/file.svg" alt="arquivo" />
                                <h3>Sou um Arquivo</h3>
                            </div>

                            <div className="arquivo">
                                <img src="/img/file.svg" alt="arquivo" />
                                <h3>Sou um Arquivo</h3>
                            </div>

                            <div className="arquivo">
                                <img src="/img/file.svg" alt="arquivo" />
                                <h3>Sou um Arquivo</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Biblioteca;