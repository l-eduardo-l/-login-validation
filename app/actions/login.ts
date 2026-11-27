
"use server";

import { prisma } from "../../lib/prisma";
import { verifyPassword } from "../../lib/password";
import { createSession } from "../../lib/session";


type login = {
    sucesso: boolean,
    mensagem: string
};

// Recebe os dados enviados pela tela de login.
export async function login(
    usuario: string, 
    senha: string
) {

    // Verifica se os campos foram preenchidos.
    if (!usuario || !senha) {
        return {
            sucesso: false,
            mensagem: "Preencha todos os campos."
        };
    }

    // Procura o usuário no banco de dados.
    const usuarioEncontrado = await prisma.user.findUnique({
        where: {
            username: usuario
        }
    });

    console.log("usuário encontrado:", !! usuarioEncontrado);

    // Verifica se o usuário existe.
    if (!usuarioEncontrado) {
        return {
            sucesso: false,
            mensagem: "Usuário ou senha incorretos."
        };
    }

    // Compara a senha digitada com o hash armazenado.
    const senhaValida = await verifyPassword(
        senha,
        usuarioEncontrado.password
    );

    console.log("senha válida:", senhaValida);


    // Verifica se a senha está correta.
    if (!senhaValida) {
        return {
            sucesso: false,
            mensagem: "Usuário ou senha incorretos."
        };
    }

    await createSession(usuarioEncontrado.id)

    // Retorna a confirmação do login.
    return {
        sucesso: true,
        mensagem: "Login realizado com sucesso!"
    };
}
