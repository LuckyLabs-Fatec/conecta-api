import { Request, Response } from "express";

import { AuthenticateUser } from "@/domain/usecases/auth/AuthenticateUser";
import { ErrorHandler } from "@/presentation/utils/ErrorHandler";

export class AuthController {
    constructor (
        private readonly authenticateUser: AuthenticateUser
    ) {}

    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        try {
            await this.authenticateUser.execute(email, password);
        } catch (error: unknown) {
            const statusCode = ErrorHandler.getStatusCode(error);
            const message = ErrorHandler.getMessage(error);
            res.status(statusCode).json({ message });
        }
    }
}