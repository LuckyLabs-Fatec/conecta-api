import { describe, it, expect } from "vitest";

import { AuthenticateUser } from "./AuthenticateUser";

import { InMemoryUserRepository } from "@/domain/repositories/InMemoryUserRepository";

describe("AuthenticateUser", () => {
    it("should throw an error if the user is not found", async () => {
        const repo = new InMemoryUserRepository();
        const useCase = new AuthenticateUser(repo);
    
        await expect(useCase.execute("nonexistent@example.com")).rejects.toThrow("User not found");
    });

    it("should return the user if found", async () => {
        const repo = new InMemoryUserRepository();
        await repo.insert({
            id: "1",
            email: "user@example.com",
            passwordHash: "hashedpassword",
        });
        const useCase = new AuthenticateUser(repo);
    
        const user = await useCase.execute("user@example.com");
        expect(user.email).toBe("user@example.com");
    });
});