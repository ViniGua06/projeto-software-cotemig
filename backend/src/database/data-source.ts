import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Church } from "./entity/Church";
import { User_Church } from "./entity/Integrants";
import { Message } from "./entity/Message";
import { Notice } from "./entity/Notice";
import { Aware } from "./entity/Aware";
import { Event } from "./entity/Event";
import { ChurchAccount } from "./entity/ChurchAccount";
import { ExpiredTokens } from "./entity/ExpiredToken";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "ep-late-sound-a8ilrjdo-pooler.eastus2.azure.neon.tech",
  port: 5432,
  username: "neondb_owner",
  password: "npg_HtPmXnr7Ul2q",
  database: "neondb",
  ssl: true, // Importante para conexão com Neon!
  synchronize: true,
  logging: true,
  entities: [
    Church,
    User_Church,
    User,
    Message,
    Notice,
    Aware,
    Event,
    ChurchAccount,
    ExpiredTokens,
  ],
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
});