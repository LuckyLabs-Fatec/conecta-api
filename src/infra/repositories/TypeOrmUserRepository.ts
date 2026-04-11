import { PrismaUserRepository } from "./PrismaUserRepository";

// Mantido apenas para compatibilidade de imports legados.
// A implementação oficial agora é baseada em Prisma.
export class TypeOrmUserRepository extends PrismaUserRepository {}