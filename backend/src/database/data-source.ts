import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

import { CreateUsersTable1712227061026 } from "./migration/1712227061026-CreateUsersTable";
import { CreateChurchsTable1714391354631 } from "./migration/1714391354631-CreateChurchsTable";
import { AddUserProphilePhotoToUsersTable1715631456709 } from "./migration/1715631456709-AddUserProphilePhotoToUsersTable";
import { CreateUserChurchTable1716936575297 } from "./migration/1716936575297-CreateUserChurchTable";
import { RenameChurchColumnName1716938540834 } from "./migration/1716938540834-RenameChurchColumnName";
import { Church } from "./entity/Church";
import { AddChurchPhotoColumn1716939198106 } from "./migration/1716939198106-AddChurchPhotoColumn";
import { User_Church } from "./entity/Integrants";
import { AddRoleColumn1717007495448 } from "./migration/1717007495448-AddRoleColumn";
import { AddCodeColumn1717019215030 } from "./migration/1717019215030-AddCodeColumn";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "isabelle.db.elephantsql.com",
  port: 5432,
  username: "qcezcnow",
  password: "sykwKydNWEQqducNboSpR4o-L9KqmvEO",
  database: "qcezcnow",
  synchronize: false,
  logging: false,
  entities: [User, Church, User_Church],
  migrations: [
    CreateUsersTable1712227061026,
    CreateChurchsTable1714391354631,
    AddUserProphilePhotoToUsersTable1715631456709,
    CreateUserChurchTable1716936575297,
    RenameChurchColumnName1716938540834,
    AddChurchPhotoColumn1716939198106,
    AddRoleColumn1717007495448,
    AddCodeColumn1717019215030,
  ],
  subscribers: [],
});
