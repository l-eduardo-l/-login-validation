// Cria a conexão entre a aplicação e o banco de dados (SQLite) usando o Prisma.
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";

// Durante o desenvolvimento o Next.js recarrega os arquivos (Hot Reload).
// Guardamos a instância no globalThis para não criar várias conexões.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function criarPrismaClient() {
  const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL ?? "file:./dev.db",
  });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? criarPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
