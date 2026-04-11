import { User } from "@/domain/models/User";
import { UserRepository } from "@/domain/repositories/UserRepository";
import { getPrismaClient } from "@/infra/database/prisma/client";

type PrismaClientLike = {
  user: {
    findUnique(args: { where: { email: string } }): Promise<UserRecord | null>;
  };
};

type UserRecord = {
  id: string;
  email: string;
  passwordHash: string;
  name: string | null;
};

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly db: PrismaClientLike = getPrismaClient()) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      passwordHash: user.passwordHash,
      name: user.name ?? undefined,
    };
  }
}
