import { MigrationInterface, QueryRunner } from "typeorm";

export class ToolCreate1700435403240 implements MigrationInterface {
    name = 'ToolCreate1700435403240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tool" ("id" varchar PRIMARY KEY NOT NULL, "externalId" varchar, "name" varchar NOT NULL, "fullName" varchar, "isUser" boolean NOT NULL DEFAULT (1), "isArhive" boolean NOT NULL DEFAULT (0), "type" varchar NOT NULL, "currentSum" decimal NOT NULL DEFAULT (0), "prevSum" decimal NOT NULL DEFAULT (0))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tool"`);
    }

}
