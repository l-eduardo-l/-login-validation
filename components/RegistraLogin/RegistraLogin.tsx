"use client";

import { useState } from "react";
import "./Registralogin.css";
import { registrarUsuario } from "@/app/actions/registro";
import { useRouter } from "next/navigation";


export default function RegistroDeLogin() {
    // Estados dos campos do cadastro.
    const [email, setEmail] = useState("");
    const [user, setUser] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");
    const [nome, setNome] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [carregando, setCarregando] = useState(false);
    // Função que envia os dados 
    const router = useRouter();

    async function handleCadastro() {
        // Limpa as mensagens anteriores 
        setMensagem("");

        // Avita o estado de carregamento
        setCarregando(true)

        try {

            //Envia os dados para o backend. 
            const resultado = await registrarUsuario(
                nome,
                email,
                user,
                senha,
                confirmaSenha
            );

            //Mostra a resposta recebida.
            setMensagem(resultado.mensagem);

            // Se funcionar manda para a pagina do login 
            if (resultado.sucesso) {
                setTimeout(() => {
                    router.push("/login");
                }, 1500);
            }
            
        } catch (error) {
            console.error("Erro ao cadastrar", error);
            setMensagem("Ocorreu um erro ao realizar o cadastro"); 
        } finally {
            // Finaliza o cadastro 
            setCarregando(false);
        }
    }

    return (
        <div className="cadastroContainer">

            {/*Campo de Nome Completo*/}
            <input 
                id="nome"
                type="text"
                placeholder="Digite seu nome completo"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
             />

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
            <button 
                 type="button"
                 onClick={handleCadastro}
                 disabled={carregando}
            >
                {carregando ? "cadastrando..." : "Enviar"}    
            </button>

            {mensagem && (
                <p>{mensagem}</p>
            )}

        </div>
    );
}
