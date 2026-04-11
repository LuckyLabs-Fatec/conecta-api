import { describe, expect, it, vi } from "vitest";

import { TypeOrmUserRepository } from "./TypeOrmUserRepository";

describe("TypeOrmUserRepository", () => {
    it("should return null if email does not exist", async () => {
        const sut = new TypeOrmUserRepository({
            user: { findUnique: vi.fn().mockResolvedValue(null) }
        });

        const user = await sut.findByEmail("nonexistent@example.com");
        expect(user).toBeNull();
    });

    it("should return user if email exists", async () => {
        const sut = new TypeOrmUserRepository({
            user: { findUnique: vi.fn().mockResolvedValue({
            id: "user-id",
            email: "existent@example.com",
            passwordHash: "hashedpassword",
            name: "Test User",
        }) }
        });

        const user = await sut.findByEmail("existent@example.com");
        expect(user?.email).toBe("existent@example.com");
    });
});