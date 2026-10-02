"use client";

import "./input.css";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Myinput() {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [sucesso, setSucesso] = useState(false);
    const router = useRouter();

    function validaSenha() {
        if (senha === "Edu123" && usuario === "Eduardo") {
            setMensagem("");
            setSucesso(true);
            router.push("/Home");
        } else {
            setMensagem("Login incorreto!");
            setSucesso(false);
        }

    }
    return (
        <div className="LoginContainer">
            <input
                type="text"
                placeholder="Digite seu usuário"
                value={usuario}
                onChange={(event) => setUsuario(event.target.value)}
            />

            <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
            />

            <button onClick={validaSenha} className="button">
                Acessar
            </button>

            <p className={ mensagem ? (sucesso ? "sucesso" : "erro") : ""}>
                {mensagem}
            </p>
        </div> 
    );
}
