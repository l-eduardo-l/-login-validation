// Roda no servidor 
"use server";

// Conexão do prisma 
import { prisma } from "@/lib/prisma";
// Função de criptografia de senha
import { hashPassword } from "@/lib/password";

type ResultadoRegistro = {
    sucesso: boolean;
    mensagem: string;
};

export async function registrarUsuario(
    nome: string,
    email: string,
    usuario: string,
    senha: string,
    confirmaSenha: string
): Promise<ResultadoRegistro> {

    // verifica se os campos estão preenchidos.
    if (!nome || !email || !usuario || !senha || !confirmaSenha) {
        return {
            sucesso: false,
            mensagem: "Preencha todos os campos."
        };
    }

    // Verifica se as senhas são iguais
    if (senha !== confirmaSenha) {
        return {
            sucesso: false,
            mensagem: "As senhas não coincidem."
        };
    }

    // 3. Verifica o tamanho mínimo da senha.
    if (senha.length < 6) {
        return {
            sucesso: false,
            mensagem: "A senha deve ter pelo menos 6 caracteres."
        };
    }

    // 4. Organiza os dados recebidos.
    const nomeLimpo = nome.trim();
    const emailLimpo = email.trim().toLowerCase();
    const usuarioLimpo = usuario.trim();

    // 5. Verifica se o e-mail ou usuário já estão cadastrados.
    const usuarioExistente = await prisma.user.findFirst({
        where: {
            OR: [
                { email: emailLimpo },
                { username: usuarioLimpo }
            ]
        }
    });

    if (usuarioExistente) {
        return {
            sucesso: false,
            mensagem: "Este e-mail ou usuário já está cadastrado."
        };
    }

    // 6. Criptografa a senha antes de salvar.
    const senhaHash = await hashPassword(senha);

    // 7. Cria o usuário no banco de dados.
    await prisma.user.create({
        data: {
            name: nomeLimpo,
            email: emailLimpo,
            username: usuarioLimpo,
            password: senhaHash
        }
    });

    // 8. Retorna uma resposta de sucesso.
    return {
        sucesso: true,
        mensagem: "Cadastro realizado com sucesso!"
    };
}
