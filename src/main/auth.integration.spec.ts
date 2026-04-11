import request from "supertest";
import { hashSync } from "bcryptjs";
import { describe, expect, it, vi } from "vitest";

process.env.JWT_SECRET = process.env.JWT_SECRET ?? "test-secret";

const validPasswordHash = hashSync("valid-password", 8);

vi.mock("@/infra/repositories/PrismaUserRepository", () => {
  return {
    PrismaUserRepository: class {
      async findByEmail(email: string) {
        if (email !== "valid@email.com") {
          return null;
        }

        return {
          id: "user-id",
          email: "valid@email.com",
          passwordHash: validPasswordHash,
          name: "Valid User",
        };
      }
    },
  };
});

import { app } from "./app";

describe("Auth integration tests", () => {
  it("should return 401 when credentials are invalid", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "wrong@email.com",
      password: "wrong-password",
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      message: "Invalid credentials",
    });
  });

  it("should return 200 when credentials are valid", async () => {
    const response = await request(app).post("/auth/login").send({
      email: "valid@email.com",
      password: "valid-password",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("accessToken");
  });
});