import { describe, it, expect } from "vitest";
import { AuthenticateUser } from "./AuthenticateUser";

describe("AuthenticateUser", () => {
    it("should throw an error if the user is not found", async () => {
        const repo = { findByEmail: async () => null };
        const useCase = new AuthenticateUser(repo);
    
        await expect(useCase.execute("nonexistent@example.com")).rejects.toThrow("User not found");
    });
});