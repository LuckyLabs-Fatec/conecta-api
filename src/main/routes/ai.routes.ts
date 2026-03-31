import { Router } from "express";

import { GoogleGenaiTextGenerator } from "@/infra/ai/google-genai-text-generator";

const aiRoutes = Router();
const aiGenerator = new GoogleGenaiTextGenerator(process.env.GOOGLE_API_KEY ?? "");

type ProfileRagContextInput = {
  userId: string;
  name: string;
  city?: string;
  remote?: boolean;
  rating?: number;
  skills?: string[];
  services?: string[];
  availability?: string;
};

function buildSkillsAndServicesContext(profiles: ProfileRagContextInput[]): string {
  if (profiles.length === 0) {
    return "Contexto recuperado:\nNenhum perfil encontrado para a consulta.";
  }

  const lines = profiles.map((profile, index) => {
    const skills = profile.skills?.length ? profile.skills.join(", ") : "não informado";
    const services = profile.services?.length
      ? profile.services.join(", ")
      : "não informado";
    const city = profile.city ?? "não informada";
    const remote = profile.remote ? "sim" : "não";
    const rating = profile.rating ?? "sem avaliação";
    const availability = profile.availability ?? "não informada";

    return `${index + 1}) [${profile.userId}] ${profile.name} - habilidades: ${skills}; serviços oferecidos: ${services}; cidade: ${city}; remoto: ${remote}; avaliação: ${rating}; disponibilidade: ${availability}`;
  });

  return `Contexto recuperado:\n${lines.join("\n")}`;
}

function buildProfileRagPrompt(question: string, context: string): string {
  return [
    "Você é um assistente de banco de tempo.",
    "Use SOMENTE o contexto recuperado para recomendar perfis.",
    "Se não houver contexto suficiente, diga isso claramente.",
    "Foque em habilidades e serviços oferecidos.",
    "",
    context,
    "",
    `Pergunta:\n${question}`,
    "",
    "Responda no formato:",
    "- Recomendações (nome + motivo)",
    "- Próximo passo sugerido no app",
  ].join("\n");
}

aiRoutes.post("/profile-context", (req, res) => {
  const { profiles } = req.body as { profiles?: ProfileRagContextInput[] };

  if (!Array.isArray(profiles)) {
    return res.status(400).send({ message: "profiles must be an array" });
  }

  const context = buildSkillsAndServicesContext(profiles);

  return res.status(200).send({ context });
});

aiRoutes.post("/profile-chat", async (req, res) => {
  try {
    const { question, profiles } = req.body as {
      question?: string;
      profiles?: ProfileRagContextInput[];
    };

    if (!question) {
      return res.status(400).send({ message: "question is required" });
    }

    if (!Array.isArray(profiles)) {
      return res.status(400).send({ message: "profiles must be an array" });
    }

    const context = buildSkillsAndServicesContext(profiles);
    const prompt = buildProfileRagPrompt(question, context);
    const text = await aiGenerator.generate(prompt);

    return res.status(200).send({ text, context });
  } catch {
    return res.status(500).send({ message: "AI profile chat failed" });
  }
});

export { aiRoutes };
