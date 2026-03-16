import { Request, Response } from "express";

import { AuthenticateUser } from "@/domain/usecases/auth/AuthenticateUser";
import { HttpErrorMapper } from "@/presentation/mappers/HttpErrorMapper";

export class AuthController {
    constructor (
        private readonly authenticateUser: AuthenticateUser
    ) {}

    async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        try {
            await this.authenticateUser.execute(email, password);
        } catch (error: unknown) {
            const statusCode = HttpErrorMapper.getStatusCode(error);
            const message = HttpErrorMapper.getMessage(error);
            res.status(statusCode).json({ message });
        }
    }
}