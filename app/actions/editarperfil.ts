
"use server";

// Conexão com o Prisma.
import { prisma } from "@/lib/prisma";

// Busca a sessão do usuário logado.
import { getSession } from "@/lib/session";

type ResultadoEdicao = {
    sucesso: boolean;
    mensagem: string;
};

export async function editarPerfil(
    nome: string,
    usuario: string,
    email: string
): Promise<ResultadoEdicao> {

    // Verifica quem está logado.
    const sessao = await getSession();

    // Impede alterações sem uma sessão válida.
    if (!sessao) {
        return {
            sucesso: false,
            mensagem: "Você precisa estar logado."
        };
    }

    // Verifica se os campos estão preenchidos.
    if (!nome.trim() || !usuario.trim() || !email.trim()) {
        return {
            sucesso: false,
            mensagem: "Preencha todos os campos."
        };
    }

    // Organiza os dados recebidos.
    const nomeLimpo = nome.trim();
    const usuarioLimpo = usuario.trim();
    const emailLimpo = email.trim().toLowerCase();

    // Verifica se o e-mail ou usuário pertence a outra conta.
    const usuarioExistente = await prisma.user.findFirst({
        where: {
            OR: [
                { email: emailLimpo },
                { username: usuarioLimpo }
            ],
            NOT: {
                id: sessao.id
            }
        }
    });

    if (usuarioExistente) {
        return {
            sucesso: false,
            mensagem: "Este e-mail ou nome de usuário já está em uso."
        };
    }

    // Atualiza somente a conta identificada pela sessão.
    await prisma.user.update({
        where: {
            id: sessao.id
        },
        data: {
            name: nomeLimpo,
            username: usuarioLimpo,
            email: emailLimpo
        }
    });

    return {
        sucesso: true,
        mensagem: "Perfil atualizado com sucesso!"
    };
}
