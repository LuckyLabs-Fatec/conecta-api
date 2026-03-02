import { describe, it, expect } from "vitest";

import { AuthenticateUser } from "./AuthenticateUser";

import { InMemoryUserRepository } from "@/domain/repositories/InMemoryUserRepository";

class FakeHashComparer {
  constructor(private readonly shouldMatch: boolean) {}
  async compare(): Promise<boolean> {
    return this.shouldMatch;
  }
}

const makeSut = (shouldMatch = true) => {
  const repo = new InMemoryUserRepository();
  const hashComparer = new FakeHashComparer(shouldMatch);
  const sut = new AuthenticateUser(repo, hashComparer);
  return { repo, sut };
};

describe("AuthenticateUser", () => {
    it("should throw an error if the user is not found", async () => {
        const { sut } = makeSut();
    
        await expect(sut.execute("nonexistent@example.com", "any-password")).rejects.toThrow("Invalid credentials");
    });

    it("should return the user if found", async () => {
        const { repo, sut } = makeSut();
        await repo.insert({
            id: "1",
            email: "user@example.com",
            passwordHash: "hashedpassword",
        });
    
        const user = await sut.execute("user@example.com", "any-password");
        expect(user.email).toBe("user@example.com");
    });

    it("should throw when password does not match", async () => {
        const repo = new InMemoryUserRepository();
        await repo.insert({
            id: "1",
            email: "user@example.com",
            passwordHash: "hashedpassword",
        });
        const useCase = new AuthenticateUser(repo, new FakeHashComparer(false));
    
        await expect(useCase.execute("user@example.com", "wrongpassword")).rejects.toThrow("Invalid credentials");
    });
});