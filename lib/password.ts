import bcrypt from "bcryptjs";

// Quantidade de rodadas utilizadas para gerar o hash 
const saltRonds = 10 

// Recebe uma senha e retorna seu hash.
export async function hashPassword(password: string) {
    const hash = await bcrypt.hash(password, saltRonds);

    return hash;
}

// Compara uma senha digitada com o hash armazenado.
export async function verifyPassword(
    password: string,
    hash: string
) {
    const senhaCorreta = await bcrypt.compare(password, hash);

    return senhaCorreta;
}
