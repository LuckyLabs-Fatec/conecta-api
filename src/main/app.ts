import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";

import { swaggerDocument } from "@/main/docs/swagger";
import { routes } from "@/main/routes/index.routes";

const app = express();
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/docs.json", (_req, res) => {
	res.status(200).json(swaggerDocument);
});
app.use(routes);

export { app };