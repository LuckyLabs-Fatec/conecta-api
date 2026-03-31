import { InvalidCredentialsError } from "@/domain/errors/InvalidCredentialsError";
import { AuthController } from "@/presentation/controllers/AuthController";

export function makeAuthController(): AuthController {
  return new AuthController({
    async execute(email: string, password: string) {
      if (email === "valid@email.com" && password === "valid-password") {
        return { accessToken: "fake-jwt-token" };
      }

      throw new InvalidCredentialsError();
    },
  });
}
