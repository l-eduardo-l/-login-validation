
// Importa o carregamento das variáveis de ambiente.
import "dotenv/config";

// Importa o adaptador responsável pela conexão com SQLite.
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

// Importa o Prisma Client gerado pelo nosso schema.
import { PrismaClient } from "../generated/prisma/client";

// Obtém o endereço do banco de dados.
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("DATABASE_URL não foi definida.");
}

// Cria o adaptador SQLite.
const adapter = new PrismaBetterSqlite3({
    url: connectionString,
});

// Evita criar várias instâncias durante o desenvolvimento.
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Reutiliza a instância existente ou cria uma nova.
export const prisma =
    globalForPrisma.prisma ?? new PrismaClient({ adapter });

// Armazena a instância globalmente durante o desenvolvimento.
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
