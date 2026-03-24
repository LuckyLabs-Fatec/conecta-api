import "dotenv/config";
import express from "express";

import { AuthController } from "@/presentation/controllers/AuthController";
import { InvalidCredentialsError } from "@/domain/errors/InvalidCredentialsError";
import { GoogleGenaiTextGenerator } from "@/infra/ai/google-genai-text-generator";

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

const aiGenerator = new GoogleGenaiTextGenerator(
  process.env.GOOGLE_API_KEY ?? ""
);

app.post("/auth/login", (req, res) => authController.login(req, res));

app.post("/ai/generate", async (req, res) => {
  try {
    const { prompt } = req.body as { prompt?: string };

    if (!prompt) {
      return res.status(400).send({ message: "prompt is required" });
    }

    const text = await aiGenerator.generate(prompt);

    return res.status(200).send({ text });
  } catch {
    return res.status(500).send({ message: "AI generation failed" });
  }
});

app.get("/", (req, res) => {
  res.send({ message: "Hello, World!" });
});

export { app };