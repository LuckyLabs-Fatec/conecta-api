import { Request, Response } from "express";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { faker } from "@faker-js/faker";

import { AuthController } from "./AuthController";

import { AuthenticateUser } from "@/domain/usecases/auth/AuthenticateUser";
import { InvalidCredentialsError } from "@/domain/errors/InvalidCredentialsError";



describe("AuthController", () => {
    let authController: AuthController;
    let authenticateUserMock: AuthenticateUser;

    beforeEach(() => {
        authenticateUserMock = {
            execute: vi.fn(),
        } as unknown as AuthenticateUser;

        authController = new AuthController(authenticateUserMock);
    })

    it("should return 401 when user is not found", async () => {
        vi.mocked(authenticateUserMock.execute).mockRejectedValue(new InvalidCredentialsError());

        const req = {
            body: {
                email: faker.internet.email(),
                password: faker.internet.password(),
            }
        } as Request;

        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        } as unknown as Response;

        await authController.login(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
    })
});