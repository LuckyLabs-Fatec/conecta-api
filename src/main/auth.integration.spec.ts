import request from "supertest";
import { hashSync } from "bcryptjs";
import { describe, expect, it, vi } from "vitest";
import { faker } from "@faker-js/faker";

process.env.JWT_SECRET = process.env.JWT_SECRET ?? "test-secret";

const validPasswordHash = hashSync("valid-password", 8);
const users = new Map<string, {
  id: string;
  email: string;
  passwordHash: string;
  name?: string;
}>([
  ["valid@email.com", {
    id: "user-id",
    email: "valid@email.com",
    passwordHash: validPasswordHash,
    name: "Valid User",
  }],
]);

vi.mock("@/infra/repositories/PrismaUserRepository", () => {
  return {
    PrismaUserRepository: class {
      async findByEmail(email: string) {
        return users.get(email) ?? null;
      }

      async create(data: { email: string; passwordHash: string; name?: string }) {
        const created = {
          id: faker.string.uuid(),
          email: data.email,
          passwordHash: data.passwordHash,
          name: data.name,
        };

        users.set(data.email, created);
        return created;
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

  it("should return 201 when user is created", async () => {
    const email = faker.internet.email();
    const response = await request(app).post("/auth/register").send({
      email,
      password: "new-password",
      name: "New User",
    });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      email,
      name: "New User",
    });
    expect(response.body).toHaveProperty("id");
  });

  it("should return 409 when email is already in use", async () => {
    const response = await request(app).post("/auth/register").send({
      email: "valid@email.com",
      password: "whatever",
      name: "Duplicated User",
    });

    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      message: "User already exists",
    });
  });
});