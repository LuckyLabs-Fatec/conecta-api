import { Router } from "express";

import { makeAuthController } from "@/main/factories/makeAuthController";

const authRoutes = Router();
const authController = makeAuthController();

authRoutes.post("/login", (req, res) => authController.login(req, res));

export { authRoutes };
