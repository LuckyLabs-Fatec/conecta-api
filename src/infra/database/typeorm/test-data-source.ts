import "reflect-metadata";
import { DataSource } from "typeorm";

import { UserEntity } from "./entities/UserEntity";

export const TestDataSource = new DataSource({
  type: "sqljs",
  autoSave: false,
  synchronize: true,
  entities: [UserEntity],
  logging: false,
});