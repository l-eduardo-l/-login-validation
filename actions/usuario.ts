
"use server";

// Importa a conexão com o banco de dados
import { prisma } from "@/lib/prisma";

// Biblioteca para criptografar (gerar hash) das senhas
import bcrypt from "bcryptjs";

// Define os dados que serão recebidos do frontend
type DadosCadastro = {
    email: string;
    user: string;
    senha: string;
    confirmaSenha: string;
};

// Função responsável pelo cadastro do usuário
export async function cadastrarUsuario(dados: DadosCadastro) {

    // Recebe e organiza os dados
    const email = dados.email.trim().toLowerCase();
    const user = dados.user.trim();
    const senha = dados.senha;
    const confirmaSenha = dados.confirmaSenha;

    // Valida se os campos estão preenchidos
    if (!email || !user || !senha || !confirmaSenha) {
        return {
            sucesso: false,
            mensagem: "Os campos não podem ser vazios."
        };
    }

    // Valida o formato do email
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(email)) {
        return {
            sucesso: false,
            mensagem: "Digite um email válido."
        };
    }

    // Valida o tamanho do usuário
    if (user.length < 3 || user.length > 12) {
        return {
            sucesso: false,
            mensagem: "O usuário deve ter entre 3 e 12 caracteres."
        };
    }

    // Verifica espaços e caracteres especiais no usuário
    if (/[ !@\/#$%^&*(),.?":{}|<>-]/.test(user)) {
        return {
            sucesso: false,
            mensagem: "O usuário não pode conter espaços ou caracteres especiais."
        };
    }

    // Verifica se as senhas são iguais
    if (senha !== confirmaSenha) {
        return {
            sucesso: false,
            mensagem: "As senhas devem ser iguais."
        };
    }

    // Valida o tamanho da senha
    if (senha.length < 6 || senha.length > 16) {
        return {
            sucesso: false,
            mensagem: "A senha deve ter entre 6 e 16 caracteres."
        };
    }

    // Verifica se a senha contém espaços
    if (/\s/.test(senha)) {
        return {
            sucesso: false,
            mensagem: "A senha não pode conter espaços."
        };
    }

    // Verifica se existe letra maiúscula
    if (!/[A-Z]/.test(senha)) {
        return {
            sucesso: false,
            mensagem: "A senha deve conter pelo menos uma letra maiúscula."
        };
    }

    // Verifica se existe letra minúscula
    if (!/[a-z]/.test(senha)) {
        return {
            sucesso: false,
            mensagem: "A senha deve conter pelo menos uma letra minúscula."
        };
    }

    try {

        // Gera o hash da senha
        const senhaHash = await bcrypt.hash(senha, 12);

        // Cria o usuário no banco de dados
        await prisma.usuario.create({
            data: {
                email: email,
                usuario: user,
                senha: senhaHash
            }
        });

        // Retorna confirmação para o frontend
        return {
            sucesso: true,
            mensagem: "Cadastro realizado com sucesso!"
        };

    } catch (erro) {

        // Verifica se o email ou usuário já estão cadastrados
        if (
            typeof erro === "object" &&
            erro !== null &&
            "code" in erro &&
            erro.code === "P2002"
        ) {
            return {
                sucesso: false,
                mensagem: "Esse email ou usuário já está cadastrado."
            };
        }

        // Registra o erro no servidor
        console.error("Erro ao cadastrar usuário:", erro);

        return {
            sucesso: false,
            mensagem: "Erro ao realizar cadastro."
        };
    }
}
