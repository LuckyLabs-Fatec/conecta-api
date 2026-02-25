import { describe, expect, it } from "vitest";

import { TypeOrmUserRepository } from "./TypeOrmUserRepository";

describe("TypeOrmUserRepository", () => {
    it("should return null if email does not exist", async () => {
        const repo = new TypeOrmUserRepository();
        const user = await repo.findByEmail("nonexistent@example.com");
        expect(user).toBeNull();
    });
});