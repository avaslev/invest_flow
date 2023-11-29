import { EntitySubscriberInterface, EventSubscriber, InsertEvent, RecoverEvent, RemoveEvent, SoftRemoveEvent, TransactionCommitEvent, TransactionRollbackEvent, TransactionStartEvent, UpdateEvent } from "typeorm"
import { Capacitor } from "@capacitor/core";
import connection from "../database";

@EventSubscriber()
export class OrmSubscriber implements EntitySubscriberInterface {


    /**
     * Called after transaction commit.
     */
    async afterTransactionCommit(event: TransactionCommitEvent) {
        const platform = Capacitor.getPlatform();

        if (platform === 'web') {
            // save the database from memory to store
            await connection.saveToStore('investFlow1');
            console.log(`AFTER TRANSACTION COMMITTED: `, event);
        }
    }
}