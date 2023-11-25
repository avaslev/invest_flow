import { DataSource } from "typeorm"

// Only for generation migrations
export const MigrationDataSource = new DataSource({
    type: "sqlite",
    database: "var/migrate.sqlite",
    entities: ["src/entity/*.ts"],
    migrations: ["src/migration/*.ts"],
})