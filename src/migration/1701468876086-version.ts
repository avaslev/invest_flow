import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1701468876086 implements MigrationInterface {
    name = 'Version1701468876086'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "action" ("id" varchar PRIMARY KEY NOT NULL, "date" date NOT NULL, "count" decimal NOT NULL DEFAULT (0), "sum" decimal NOT NULL DEFAULT (0), "operation" varchar NOT NULL, "category" varchar, "note" varchar, "toolId" varchar, "toolToId" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_action" ("id" varchar PRIMARY KEY NOT NULL, "date" date NOT NULL, "count" decimal NOT NULL DEFAULT (0), "sum" decimal NOT NULL DEFAULT (0), "operation" varchar NOT NULL, "category" varchar, "note" varchar, "toolId" varchar, "toolToId" varchar, CONSTRAINT "FK_2d81ccc8e7fb25cb5aaa1c61755" FOREIGN KEY ("toolId") REFERENCES "tool" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_5adae27835956c54f31ace9b1bb" FOREIGN KEY ("toolToId") REFERENCES "tool" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_action"("id", "date", "count", "sum", "operation", "category", "note", "toolId", "toolToId") SELECT "id", "date", "count", "sum", "operation", "category", "note", "toolId", "toolToId" FROM "action"`);
        await queryRunner.query(`DROP TABLE "action"`);
        await queryRunner.query(`ALTER TABLE "temporary_action" RENAME TO "action"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "action" RENAME TO "temporary_action"`);
        await queryRunner.query(`CREATE TABLE "action" ("id" varchar PRIMARY KEY NOT NULL, "date" date NOT NULL, "count" decimal NOT NULL DEFAULT (0), "sum" decimal NOT NULL DEFAULT (0), "operation" varchar NOT NULL, "category" varchar, "note" varchar, "toolId" varchar, "toolToId" varchar)`);
        await queryRunner.query(`INSERT INTO "action"("id", "date", "count", "sum", "operation", "category", "note", "toolId", "toolToId") SELECT "id", "date", "count", "sum", "operation", "category", "note", "toolId", "toolToId" FROM "temporary_action"`);
        await queryRunner.query(`DROP TABLE "temporary_action"`);
        await queryRunner.query(`DROP TABLE "action"`);
    }

}
