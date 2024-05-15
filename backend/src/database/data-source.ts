import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

import { CreateUsersTable1712227061026 } from "./migration/1712227061026-CreateUsersTable";
import { CreateChurchsTable1714391354631 } from "./migration/1714391354631-CreateChurchsTable";
import { AddUserProphilePhotoToUsersTable1715631456709 } from "./migration/1715631456709-AddUserProphilePhotoToUsersTable";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "isabelle.db.elephantsql.com",
  port: 5432,
  username: "qcezcnow",
  password: "sykwKydNWEQqducNboSpR4o-L9KqmvEO",
  database: "qcezcnow",
  synchronize: false,
  logging: false,
  entities: [User],
  migrations: [
    CreateUsersTable1712227061026,
    CreateChurchsTable1714391354631,
    AddUserProphilePhotoToUsersTable1715631456709,
  ],
  subscribers: [],
});
