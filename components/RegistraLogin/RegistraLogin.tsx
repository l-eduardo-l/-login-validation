"use client";

import { cadastrarUsuario } from "@/actions/usuario"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./Registralogin.css";

export default function RegistroDeLogin() {

    //Declaração de variaveis 
    const [email, setEmail] = useState("");
    const [user, setUser] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");
    const [alert, setAlert] = useState("");
    const router = useRouter();

    // Responsavel por controlar o botão enquanto o Backend processa o cadastro. 
    const [carregando, setCarregando] = useState(false);



    async function validalogin() {

        // Inicia o carregamento e limpa o alerta anterior
        setCarregando(true);
        setAlert("");

        try {

            // Envia os dados para o backend
            const resultado = await cadastrarUsuario({
                email,
                user,
                senha,
                confirmaSenha
            });

            // Exibe a resposta recebida do backend
            setAlert(resultado.mensagem);

            // Se o cadastro foi realizado com sucesso
            if (resultado.sucesso) {

                // Limpa os campos
                setEmail("");
                setUser("");
                setSenha("");
                setConfirmaSenha("");

                // Redireciona para a tela de login
                setTimeout(() => {
                    router.push("/login");
                }, 1000);
            }

        } catch (erro) {

            // Trata possíveis erros de comunicação
            console.error("Erro ao realizar cadastro:", erro);

            setAlert("Não foi possível realizar o cadastro.");

        } finally {

            // Finaliza o carregamento
            setCarregando(false);
        }
    }
return(
    <div className="cadastroContainer">

        <input
            type="email"
            placeholder="Digite seu Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
        />

        <input
            type="text"
            placeholder="Digite seu usuario"
            value={user}
            onChange={(event) => setUser(event.target.value)}
        />


        <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
        />

        <input
            type="password"
            placeholder="Digite sua senha novamente"
            value={confirmaSenha}
            onChange={(event) => setConfirmaSenha(event.target.value)}
        />

        <button
            className={alert ? "sucesso" : "erro"}
            onClick={validalogin}
            disabled={carregando}
        >
            {carregando ? "Cadastrando..." : "Enviar"}
        </button>
        
        <p>
            {alert}
        </p>

    </div>
)
}
