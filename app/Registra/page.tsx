import "./Registra.css";
import RegistroDeLogin from "@/components/RegistraLogin/RegistraLogin";

export default function Cadastrarlogin() {

    return (
        <main>
            <div className="authentication-container">

                <h1>Sing in to sistem</h1>

                <div className="authentication-body">

                    <RegistroDeLogin />

                </div>
            </div>
        </main>
    );
}
