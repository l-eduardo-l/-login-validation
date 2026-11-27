import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import EditarPerfil from "@/components/perfil/EditarPerfil";

export default async function PerfilPage() {

    // Busca os dados do usuário que está logado.
    const usuario = await getSession();

    // Se não estiver logado, volta para o login.
    if (!usuario) {
        redirect("/login");
    }

    return (
        <main>
            <h1>Meu perfil</h1>

            <EditarPerfil
                nome={usuario.name}
                usuario={usuario.username}
                email={usuario.email}
            />
        </main>
    );
}