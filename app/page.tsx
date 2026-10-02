import "./login.css";
import Validalogin from "@/components/validaLogin/input";
// import LogarComo from "@/components/LogarComo/Button";

export default function LoginPage() {
    return (
        <div className="container">

            <h2>Scesse sua Conta</h2>

            <div className="forms">

                <Validalogin />

            </div>

            <span className="recSenha">Esqueceu a senha?</span>

           <div className="barr"></div>

            <samp>Não tem conta? <a href="./Registra">Registre-se grátis</a></samp>

        </div>
    )
}
