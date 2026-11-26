
import "server-only";

import { randomBytes, createHash } from "crypto";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

// Nome do cookie que armazenará o token da sessão.
const COOKIE_NAME = "session";

// Duração da sessão: 7 dias.
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000;

// Gera um hash SHA-256 do token.
function hashToken(token: string) {
    return createHash("sha256").update(token).digest("hex");
}

// Cria uma sessão para o usuário.
export async function createSession(userId: number) {

    // Gera um token aleatório e seguro.
    const token = randomBytes(32).toString("hex");

    // Armazena somente o hash do token no banco.
    const tokenHash = hashToken(token);

    // Define quando a sessão irá expirar.
    const expiresAt = new Date(Date.now() + SESSION_DURATION);

    // Salva a sessão no banco de dados.
    await prisma.session.create({
        data: {
            tokenHash,
            userId,
            expiresAt,
        },
    });

    // Armazena o token em um cookie protegido.
    const cookieStore = await cookies();

    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: expiresAt,
        path: "/",
    });
}

// Recupera a sessão do usuário autenticado.
export async function getSession() {

    const cookieStore = await cookies();

    // Busca o token armazenado no navegador.
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) return null;

    // Transforma o token em hash para consultar o banco.
    const tokenHash = hashToken(token);

    const session = await prisma.session.findUnique({
        where: { tokenHash },
        include: { user: true },
    });

    if (!session) return null;

    // Verifica se a sessão expirou.
    if (session.expiresAt <= new Date()) {

        await prisma.session.delete({
            where: { id: session.id },
        });

        cookieStore.delete(COOKIE_NAME);

        return null;
    }

    // Retorna os dados públicos do usuário.
    return {
        id: session.user.id,
        name: session.user.name,
        username: session.user.username,
        email: session.user.email,
    };
}

// Encerra a sessão do usuário.
export async function deleteSession() {

    const cookieStore = await cookies();

    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (token) {

        const tokenHash = hashToken(token);

        // Remove a sessão correspondente do banco.
        await prisma.session.deleteMany({
            where: { tokenHash },
        });
    }

    // Remove o cookie do navegador.
    cookieStore.delete(COOKIE_NAME);
}
