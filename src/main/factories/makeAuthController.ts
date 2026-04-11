import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { InvalidCredentialsError } from "@/domain/errors/InvalidCredentialsError";
import { PrismaUserRepository } from "@/infra/repositories/PrismaUserRepository";
import { AuthController } from "@/presentation/controllers/AuthController";

export function makeAuthController(): AuthController {
  const userRepository = new PrismaUserRepository();

  return new AuthController({
    async execute(email: string, password: string) {
      const user = await userRepository.findByEmail(email);

      if (!user) {
        throw new InvalidCredentialsError();
      }

      const passwordMatches = await compare(password, user.passwordHash);

      if (!passwordMatches) {
        throw new InvalidCredentialsError();
      }

      const jwtSecret = process.env.JWT_SECRET;

      if (!jwtSecret) {
        throw new Error("JWT_SECRET is not configured");
      }

      const jwtExpiresIn =
        (process.env.JWT_EXPIRES_IN ?? "15m") as Parameters<typeof sign>[2]["expiresIn"];

      const accessToken = sign(
        { email: user.email },
        jwtSecret,
        {
          subject: user.id,
          expiresIn: jwtExpiresIn,
        }
      );

      return { accessToken };

    },
  });
}
