// Configuração do Prisma CLI (migrate, generate, studio...).
// No Prisma 7 é aqui que fica a URL do banco.
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
