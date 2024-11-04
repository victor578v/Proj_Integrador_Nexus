"use client"
import React from 'react';
import Link from 'next/link';
import './chat.css';
import ItemMensagem from '../ItemMensagem/itemmensagem';

const Chat = () => {
    return (
        <section className="chat">
            <div className="mensagens">
                <ItemMensagem />
            </div>

            <div className="enviar-mensagem">
                <input name="mensagem" id="mensagem" placeholder="Digite sua mensagem..." />
                <div className="botoes">
                    <button className="btn-negrito">B</button>
                    <button className="btn-italico">I</button>
                    <button className="btn-underline">U</button>
                    <button className="btn-dado-4">🎲 D4</button>
                    <button className="btn-dado-6">🎲 D6</button>
                    <button className="btn-dado-8">🎲 D8</button>
                    <button className="btn-dado-10">🎲 D10</button>
                    <button className="btn-dado-12">🎲 D12</button>
                    <button className="btn-dado-20">🎲 D20</button>
                    <button className="btn-dado-100">🎲 D100</button>
                </div>
            </div>

        </section>
    );
};

export default Chat;