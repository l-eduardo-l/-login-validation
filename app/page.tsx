import "./login.css";
import Validalogin from "@/components/validaLogin/input";

export default function LoginPage() {
    return (
        <div className="container">

            <h2>Scesse sua Conta</h2>

            <div className="forms">

                <Validalogin />

            </div>

            <span className="recSenha"><a href="/RecuperarSenha">Esqueceu a senha?</a></span>

           <div className="barr"></div>

            <samp>Não tem conta? <a href="./Registra">Registre-se grátis</a></samp>

        </div>
    )
}
