import "reflect-metadata";
import { DataSource } from "typeorm";

import { UserEntity } from "./entities/UserEntity";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  entities: [UserEntity],
  migrations: ["src/infra/database/typeorm/migrations/*.ts"],
  subscribers: [],
});