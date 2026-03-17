import { Request, Response } from "express";

import { HttpErrorMapper } from "@/presentation/mappers/HttpErrorMapper";

type AuthenticateUserContract = {
  execute(email: string, password: string): Promise<unknown>;
};

export class AuthController {
  constructor(private readonly authenticateUser: AuthenticateUserContract) {}

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const result = await this.authenticateUser.execute(email, password);
      res.status(200).json(result ?? {});
    } catch (error: unknown) {
      const statusCode = HttpErrorMapper.getStatusCode(error);
      const message = HttpErrorMapper.getMessage(error);
      res.status(statusCode).json({ message });
    }
  }
}