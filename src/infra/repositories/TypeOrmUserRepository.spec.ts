import { beforeAll, describe, expect, it } from "vitest";

import { UserEntity } from "../database/typeorm/entities/UserEntity";
import { TestDataSource } from "../../test/infra/typeorm/test-data-source";

import { TypeOrmUserRepository } from "./TypeOrmUserRepository";

describe("TypeOrmUserRepository", () => {
    let sut: TypeOrmUserRepository;

    beforeAll(async () => {
        await TestDataSource.initialize();

        sut = new TypeOrmUserRepository(TestDataSource);
    });

    it("should return null if email does not exist", async () => {
        const user = await sut.findByEmail("nonexistent@example.com");
        expect(user).toBeNull();
    });

    it("should return user if email exists", async () => {
        const repo = TestDataSource.getRepository(UserEntity);
        await repo.save({
            email: "existent@example.com",
            passwordHash: "hashedpassword",
            name: "Test User",
        });

        const user = await sut.findByEmail("existent@example.com");
        expect(user?.email).toBe("existent@example.com");
    });
});