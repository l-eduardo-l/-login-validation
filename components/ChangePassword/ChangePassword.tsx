"use client";

import { useRouter } from "next/navigation";
import "./ChangePassword.css";
import { useState } from "react";


export default function ChangePassword() {

    const [email, setEmail] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [valida, setValida] = useState(false);

    const router = useRouter();
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let emailDoBanco = "bancodedados@gmail.com"

    //Função que vai valider o email de recuperação 
    function valideEmail() {

        if ( email.trim() === "") {
            setMensagem("Adicione um email para recuperar sua senha");
            return;
        }

        //Verifica se o Email atende os requisitos 
        if (!emailValido.test(email)) {
            setMensagem("Digite um email Valido.");
            return;
        }

        //valida se o Email está cadastrado para recupeção de alguma conta
        if (email === emailDoBanco) {
            setMensagem("Código de redefinição de senha enviado");
            setValida(true);
            return;
        }

        router.push("/");

    }

    return (
        <div className="RecSenha">

            <input
                type="Email"
                placeholder="Digite o email de recuperação"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />

            <button onClick={valideEmail}>
                Enviar
            </button>

            <p>
                {mensagem}
            </p>

        </div>
    );
}
