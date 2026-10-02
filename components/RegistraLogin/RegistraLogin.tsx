"use client";

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
    const [validation, setValidation] = useState(false);
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [usuarios, setUsuarios] = useState([]);
    const router = useRouter();


    // Faz com  que a mensagem de alerta desapareça após 2 segundos
    useEffect(() => {
        if (alert === "") return;

        const timer = setTimeout(() => {
            setAlert("");
        }, 2000);

        return () => clearTimeout(timer);
    }, [alert]);

    //Função que valida Login
    function validalogin() {
        if (email.trim() === "" ||
            user.trim() === "" ||
            senha.trim() === "") {
            setAlert("Os campos não podem ser vazios");
            setEmail("");
            setUser("");
            setSenha("");
            setConfirmaSenha("");
            return;
        }

        //Verifica se o Email atende os requisitos 
        if (!emailValido.test(email)) {
            setAlert("Digite um email Valido.")
            return;
        }

        //Verifica se o usuário e válido.
        if (user.length < 3) {
            setAlert("O usuário deve ter no minimo 3 caracteres");
            return;    
        } if (user.length > 12) {
            setAlert("O usuário deve ter no maximo 12 caracteres");
            return;
        } if (user.includes(" ") || /[!@\/#$%^&*(),.?":{}|<>-]/.test(user)){
            setAlert("O usuário não pode conter espaços ou caracteres especiais");
            return;

        }
        //Verifica se a senha é igual a confirmação.
        if (senha !== confirmaSenha) {
            setAlert("As senhas devem ser iguais");
            setEmail("");
            setUser("");
            setSenha("");
            setConfirmaSenha("");
            return;
        }
        
        // Verifica se a senha atende os requisitos.
        if (senha.length < 6) {
            setAlert("A senha deve ter no minimo 6 caracteres");
            return;
        }if (senha.length > 16) {
            setAlert("A senha deve ter no maximo 16 caracteres");
            return;
        }if (senha.includes(" ") ){
            setAlert("A senha não pode conter espaços ou caracteres especiais");
            return;
        }if (!/[A-Z]/.test(senha)) {
            setAlert("A senha deve conter pelo menos uma letra maiúscula");
            return;
        }if (!/[a-z]/.test(senha)) {
            setAlert("A senha deve conter pelo menos uma letra minúscula");
            return;
        }

        //Se passar pelos filtros o usuário é cadastrado e mandado para a tela de login
        setAlert("Sucesso!");
        router.push("/");
        //Const que está armazenado os dados de login em formato de Objeto. Opção temporaria, pq quando o logi e feito a function reinicia e os dados são perdidos.
        const novoUsuarios = {
            email,
            user,
            senha,
            confirmaSenha,
            validacao: true,
            data: {
                dia: new Date().getDate(),
                mes: new Date().getMonth() + 1,
                ano: new Date().getFullYear(),
                hora: new Date().getHours(),
            }
        }
        console.log(novoUsuarios);

    }
    return (
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

            <button className={alert ? "sucesso" : "erro"} onClick={validalogin}>
                Enviar
            </button>

            <p>
                {alert}
            </p>

        </div>
    );
}
