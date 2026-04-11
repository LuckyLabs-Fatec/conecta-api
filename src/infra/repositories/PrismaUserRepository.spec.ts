import { describe, expect, it, vi } from "vitest";

import { PrismaUserRepository } from "./PrismaUserRepository";

describe("PrismaUserRepository", () => {
  it("should return null when user does not exist", async () => {
    const findUnique = vi.fn().mockResolvedValue(null);
    const sut = new PrismaUserRepository({
      user: { findUnique },
    });

    const user = await sut.findByEmail("nonexistent@example.com");

    expect(user).toBeNull();
    expect(findUnique).toHaveBeenCalledWith({
      where: { email: "nonexistent@example.com" },
    });
  });

  it("should return mapped user when email exists", async () => {
    const findUnique = vi.fn().mockResolvedValue({
      id: "user-id",
      email: "existent@example.com",
      passwordHash: "hashed-password",
      name: "Test User",
    });

    const sut = new PrismaUserRepository({
      user: { findUnique },
    });

    const user = await sut.findByEmail("existent@example.com");

    expect(user).toEqual({
      id: "user-id",
      email: "existent@example.com",
      passwordHash: "hashed-password",
      name: "Test User",
    });
  });
});
