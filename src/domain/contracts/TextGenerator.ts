export interface TextGenerator {
  generate(prompt: string): Promise<string>;
}