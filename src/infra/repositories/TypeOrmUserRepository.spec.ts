import { beforeEach, describe, expect, it } from "vitest";

import { TypeOrmUserRepository } from "./TypeOrmUserRepository";

describe("TypeOrmUserRepository", () => {
    let sut: TypeOrmUserRepository;

    beforeEach(() => {
        sut = new TypeOrmUserRepository();
    });

    it("should return null if email does not exist", async () => {
        const user = await sut.findByEmail("nonexistent@example.com");
        expect(user).toBeNull();
    });
});