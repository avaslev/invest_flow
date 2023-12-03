import { DataSource } from "typeorm";
import sqliteConnection from '../database';
import { Tool } from "../entity/tool";
import { ToolCreate1700435403240 } from "../migration/1700435403240-ToolCreate";
import { OrmSubscriber } from "../subscriber/orm";
import { Action } from "../entity/action";
import { Version1701468876086 } from "../migration/1701468876086-version";

export const AppDataSource = new DataSource({
    type: "capacitor",
    driver: sqliteConnection,
    database: "investFlow1",
    mode: "no-encryption",
    synchronize: false,
    entities: [
        Tool,
        Action,
    ],
    migrations: [
        ToolCreate1700435403240,
        Version1701468876086
    ],
    subscribers: [OrmSubscriber],
    logging: true,
})