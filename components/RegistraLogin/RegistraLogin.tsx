"use client";

import { useState } from "react";
import "./Registralogin.css";

export default function RegistroDeLogin() {
    // Estados dos campos do cadastro.
    const [email, setEmail] = useState("");
    const [user, setUser] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");

    return (
        <div className="cadastroContainer">

            {/* Campo de email */}
            <input
                type="email"
                placeholder="Digite seu Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />

            {/* Campo de usuário */}
            <input
                type="text"
                placeholder="Digite seu usuário"
                value={user}
                onChange={(event) => setUser(event.target.value)}
            />

            {/* Campo de senha */}
            <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
            />

            {/* Confirmação de senha */}
            <input
                type="password"
                placeholder="Digite sua senha novamente"
                value={confirmaSenha}
                onChange={(event) => setConfirmaSenha(event.target.value)}
            />

            {/* Botão visual, sem integração com backend */}
            <button type="button">
                Enviar
            </button>

        </div>
    );
}
