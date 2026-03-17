import express from "express";

import { AuthController } from "@/presentation/controllers/AuthController";
import { InvalidCredentialsError } from "@/domain/errors/InvalidCredentialsError";

const app = express();
app.use(express.json());

const authController = new AuthController({
  async execute(email: string, password: string) {
    if (email === "valid@email.com" && password === "valid-password") {
      return { accessToken: "fake-jwt-token" };
    }

    throw new InvalidCredentialsError();
  },
});

app.post("/auth/login", (req, res) => authController.login(req, res));

app.get("/", (req, res) => {
  res.send({ message: "Hello, World!" });
});

export { app };