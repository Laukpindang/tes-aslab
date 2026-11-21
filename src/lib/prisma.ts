import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("No db url");
}

const adapter = new PrismaPg({
  connectionString: DATABASE_URL,
});

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};
const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
