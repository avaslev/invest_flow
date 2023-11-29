import { DataSource } from "typeorm";
import sqliteConnection from '../database';
import { Tool } from "../entity/tool";
import { ToolCreate1700435403240 } from "../migration/1700435403240-ToolCreate";
import { OrmSubscriber } from "../subscriber/orm";

export const AppDataSource = new DataSource({
    type: "capacitor",
    driver: sqliteConnection,
    database: "investFlow1",
    mode: "no-encryption",
    synchronize: false,
    entities: [
        Tool,
    ],
    migrations: [
        ToolCreate1700435403240,
    ],
    subscribers: [OrmSubscriber],
    logging: true,
})