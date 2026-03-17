import request from "supertest";
import { describe, expect, it } from "vitest";

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
  });
});