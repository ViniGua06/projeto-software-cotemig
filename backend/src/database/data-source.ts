import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Church } from "./entity/Church";
import { User_Church } from "./entity/Integrants";
import { Message } from "./entity/Message";
import { Notice } from "./entity/Notice";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "isabelle.db.elephantsql.com",
  port: 5432,
  username: "qcezcnow",
  password: "sykwKydNWEQqducNboSpR4o-L9KqmvEO",
  database: "qcezcnow",
  synchronize: false,
  logging: false,
  entities: [Church, User_Church, User, Message, Notice],
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
});
