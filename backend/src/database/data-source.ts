import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

import { CreateUsersTable1712227061026 } from "./migration/1712227061026-CreateUsersTable";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "IgrejaDatabase",
  synchronize: false,
  logging: false,
  entities: [User],
  migrations: [CreateUsersTable1712227061026],
  subscribers: [],
});
