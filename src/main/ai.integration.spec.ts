import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { generateMock } = vi.hoisted(() => ({
  generateMock: vi.fn(),
}));

vi.mock("@/infra/ai/google-genai-text-generator", () => ({
  GoogleGenaiTextGenerator: class {
    generate = generateMock;
  },
}));

import { app } from "./app";

describe("AI routes integration tests", () => {
  beforeEach(() => {
    generateMock.mockReset();
  });

  it("should return 400 when profiles is not an array on profile-context", async () => {
    const response = await request(app).post("/ai/profile-context").send({
      profiles: "invalid",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "profiles must be an array",
    });
  });

  it("should return context fallback when no profiles are provided", async () => {
    const response = await request(app).post("/ai/profile-context").send({
      profiles: [],
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      context: "Contexto recuperado:\nNenhum perfil encontrado para a consulta.",
    });
  });

  it("should build profile context with skills and services", async () => {
    const response = await request(app)
      .post("/ai/profile-context")
      .send({
        profiles: [
          {
            userId: "u-1",
            name: "Ana",
            skills: ["React", "Node.js"],
            services: ["Mentoria", "Code review"],
            city: "São Paulo",
            remote: true,
            rating: 4.8,
            availability: "manhã",
          },
        ],
      });

    expect(response.status).toBe(200);
    expect(response.body.context).toBe(
      "Contexto recuperado:\n1) [u-1] Ana - habilidades: React, Node.js; serviços oferecidos: Mentoria, Code review; cidade: São Paulo; remoto: sim; avaliação: 4.8; disponibilidade: manhã",
    );
  });

  it("should return 400 when question is missing on profile-chat", async () => {
    const response = await request(app).post("/ai/profile-chat").send({
      profiles: [],
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "question is required",
    });
  });

  it("should return 400 when profiles is not an array on profile-chat", async () => {
    const response = await request(app).post("/ai/profile-chat").send({
      question: "Quem pode me ajudar com React?",
      profiles: "invalid",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "profiles must be an array",
    });
  });

  it("should return AI response and context on profile-chat", async () => {
    generateMock.mockResolvedValue("Recomendações geradas pela IA");

    const response = await request(app)
      .post("/ai/profile-chat")
      .send({
        question: "Quem pode me ajudar com backend em Node?",
        profiles: [
          {
            userId: "u-2",
            name: "Carlos",
            skills: ["Node.js", "TypeScript"],
            services: ["Pair programming"],
            remote: false,
          },
        ],
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      text: "Recomendações geradas pela IA",
      context:
        "Contexto recuperado:\n1) [u-2] Carlos - habilidades: Node.js, TypeScript; serviços oferecidos: Pair programming; cidade: não informada; remoto: não; avaliação: sem avaliação; disponibilidade: não informada",
    });

    expect(generateMock).toHaveBeenCalledTimes(1);
    const prompt = generateMock.mock.calls[0][0] as string;
    expect(prompt).toContain("Use SOMENTE o contexto recuperado para recomendar perfis.");
    expect(prompt).toContain("Pergunta:\nQuem pode me ajudar com backend em Node?");
    expect(prompt).toContain("[u-2] Carlos");
  });

  it("should return 500 when AI generator fails", async () => {
    generateMock.mockRejectedValue(new Error("upstream error"));

    const response = await request(app).post("/ai/profile-chat").send({
      question: "Sugira perfis",
      profiles: [],
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "AI profile chat failed",
    });
  });
});
