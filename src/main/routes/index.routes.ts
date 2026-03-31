import { Router } from "express";

import { aiRoutes } from "@/main/routes/ai.routes";
import { authRoutes } from "@/main/routes/auth.routes";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/ai", aiRoutes);

routes.get("/", (req, res) => {
  res.send({ message: "Hello, World!" });
});

export { routes };
