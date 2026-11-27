
import "./home.css";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import CabecalhoHome from "@/components/cabecalho/cabecalho";

export default async function HomePage() {

    // Busca a sessão do usuário no servidor.
    const usuario = await getSession();

    // Se não existir uma sessão válida, volta para o login.
    if (!usuario) {
        redirect("/login");
    }

    return (
        <div>

            <CabecalhoHome />

            <h1>Bem-vindo, {usuario.name}!</h1>

        </div>
    );
}
