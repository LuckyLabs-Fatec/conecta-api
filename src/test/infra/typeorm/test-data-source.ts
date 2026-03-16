import "reflect-metadata";
import { DataSource } from "typeorm";

import { UserEntity } from "../../../infra/database/typeorm/entities/UserEntity";

export const TestDataSource = new DataSource({
  type: "sqljs",
  autoSave: false,
  synchronize: true,
  entities: [UserEntity],
  logging: false,
});