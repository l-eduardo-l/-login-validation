
"use client";

import { useState } from "react";
import { login } from "@/app/actions/login"
import "./input.css";
import { useRouter } from "next/navigation";

export default function Myinput() {

    // Estados dos campos de login.
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");

    // Estado da mensagem de retorno.
    const [mensagem, setMensagem] = useState("");

    // Controla o carregamento do login.
    const [carregando, setCarregando] = useState(false);

    const router = useRouter();

    // Executa o login no backend.
    async function handleLogin() {

        // Limpa a mensagem anterior.
        setMensagem("");

        // Inicia o carregamento.
        setCarregando(true);

        try {
            // Envia os dados para o backend.
            const resultado = await login(
                usuario, 
                senha
            );
            
            console.log("Resposta do backend:", resultado);
            
            // Exibe a resposta recebida.
            setMensagem(resultado.mensagem);

            // Se funcionar manda para a pagina do login 
            if (resultado.sucesso) {
                setTimeout(() => {
                    router.push("/home");
                }, 1500);
            }


        } catch (erro) {
            // Trata possíveis erros inesperados.
            console.error("Erro ao realizar login:", erro);
            setMensagem("Erro ao realizar login.");

        } finally {
            // Finaliza o carregamento.
            setCarregando(false);
        }
    }

    return (
        <div className="LoginContainer">

            {/* Campo de usuário */}
            <input
                type="text"
                placeholder="Digite seu usuário"
                value={usuario}
                onChange={(event) => setUsuario(event.target.value)}
            />

            {/* Campo de senha */}
            <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
            />

            {/* Botão de acesso */}
            <button
                type="button"
                className="button"
                onClick={handleLogin}
                disabled={carregando}
            >
                {carregando ? "Verificando..." : "Acessar"}
            </button>

            {/* Mensagem de retorno */}
            <p className={mensagem.includes("sucesso") ? "sucesso" : "erro"}>
                {mensagem}
            </p>

        </div>
    );
}
