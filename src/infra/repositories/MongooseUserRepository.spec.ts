import { describe, expect, it } from "vitest";

import { MongooseUserRepository } from "./MongooseUserRepository";

describe("MongooseUserRepository", () => {
    it("should return null when email does not exist", async () => {
        const repository = new MongooseUserRepository();
        const result = await repository.findByEmail("nonexistent@example.com");
        expect(result).toBeNull();
    });
});