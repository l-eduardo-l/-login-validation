
"use client";

import { useState } from "react";
import { editarPerfil } from "@/app/actions/editarperfil";

type EditarPerfilProps = {
    nome: string;
    usuario: string;
    email: string;
};

export default function EditarPerfil({
    nome,
    usuario,
    email
}: EditarPerfilProps) {

    const [nomeAtual, setNomeAtual] = useState(nome);
    const [usuarioAtual, setUsuarioAtual] = useState(usuario);
    const [emailAtual, setEmailAtual] = useState(email);

    const [mensagem, setMensagem] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function salvarAlteracoes() {

        setCarregando(true);
        setMensagem("");

        const resultado = await editarPerfil(
            nomeAtual,
            usuarioAtual,
            emailAtual
        );

        setMensagem(resultado.mensagem);
        setCarregando(false);
    }

    return (
        <main>
            <h2>Editar perfil</h2>

            <label>Nome</label>
            <input
                value={nomeAtual}
                onChange={(e) => setNomeAtual(e.target.value)}
            />

            <label>Nome de usuário</label>
            <input
                value={usuarioAtual}
                onChange={(e) => setUsuarioAtual(e.target.value)}
            />

            <label>E-mail</label>
            <input
                value={emailAtual}
                onChange={(e) => setEmailAtual(e.target.value)}
            />

            <button
                type="button"
                onClick={salvarAlteracoes}
                disabled={carregando}
            >
                {carregando ? "Salvando..." : "Salvar alterações"}
            </button>

            {mensagem && <p>{mensagem}</p>}
        </main>
    );
}
