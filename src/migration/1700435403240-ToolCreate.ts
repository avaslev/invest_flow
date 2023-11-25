import { MigrationInterface, QueryRunner, UpdateQueryBuilder } from "typeorm";
import { ToolTypeEnum } from "../entity/tool";

export class ToolCreate1700435403240 implements MigrationInterface {
    name = 'ToolCreate1700435403240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tool" ("id" varchar PRIMARY KEY NOT NULL, "externalId" varchar, "name" varchar NOT NULL, "fullName" varchar, "isUser" boolean NOT NULL DEFAULT (1), "isArhive" boolean NOT NULL DEFAULT (0), "type" varchar NOT NULL, "currentSum" decimal NOT NULL DEFAULT (0), "prevSum" decimal NOT NULL DEFAULT (0))`);
        await queryRunner.query(
            `INSERT INTO "tool"("id", "externalId", "name", "fullName", "isUser", "isArhive", "type", "currentSum", "prevSum") VALUES (?, NULL, ?, NULL, 1, 0, ?, 0, 0)`, 
            [this.generateUUID(), 'Wallet', ToolTypeEnum.Cash]);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tool"`);
    }

    generateUUID() { // Public Domain/MIT
        let d = new Date().getTime();//Timestamp
        let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

}
