import { GoogleGenAI } from "@google/genai";

import { TextGenerator } from "@/domain/contracts/TextGenerator";

export class GoogleGenaiTextGenerator implements TextGenerator {
  private readonly client: GoogleGenAI;
  private readonly model: string;

  constructor(apiKey: string, model = "gemini-2.5-flash") {
    this.client = new GoogleGenAI({ apiKey });
    this.model = model;
  }

  async generate(prompt: string): Promise<string> {
    const response = await this.client.models.generateContent({
      model: this.model,
      contents: prompt,
    });

    return response.text ?? "";
  }
}