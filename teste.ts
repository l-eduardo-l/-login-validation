
import { prisma } from "./lib/prisma";
import { hashPassword, verifyPassword } from "./lib/password";

async function main() {

    // Senha original que utilizaremos no teste.
    const senhaOriginal = "senha_temporaria";

    // Busca o usuário que cadastramos anteriormente.
    const usuario = await prisma.user.findUnique({
        where: {
            username: "teste123",
        },
    });

    // Verifica se o usuário existe.
    if (!usuario) {
        throw new Error("Usuário não encontrado!");
    }

    // Gera o hash da senha.
    const senhaHash = await hashPassword(senhaOriginal);

    // Atualiza a senha do usuário no banco.
    const usuarioAtualizado = await prisma.user.update({
        where: {
            id: usuario.id,
        },
        data: {
            password: senhaHash,
        },
    });

    console.log("Hash salvo no banco com sucesso!");

    // Testa se a senha original corresponde ao hash.
    const senhaCorreta = await verifyPassword(
        senhaOriginal,
        usuarioAtualizado.password
    );

    // Testa uma senha incorreta.
    const senhaIncorreta = await verifyPassword(
        "senha_errada",
        usuarioAtualizado.password
    );

    console.log("Senha correta:", senhaCorreta);
    console.log("Senha incorreta:", senhaIncorreta);
}

// Executa os testes.
main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });
