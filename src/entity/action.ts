import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "./abstractEntity";
import { Tool } from "./tool";

export enum ActionOperationEnum {
    Income = 'income',
    Outlay = 'outlay',
}

@Entity()
export class Action extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({type: 'date'})
    date!: Date;

    @ManyToOne(() => Tool)
    @JoinTable()
    tool!: Tool;
  
    @ManyToOne(() => Tool)
    @JoinTable()
    toolTo?: Tool;

    @Column({type: 'decimal', default: 0})
    count!: number;

    @Column({type: 'decimal', default: 0})
    sum!: number;

    @Column({type: 'varchar',})
    operation!: ActionOperationEnum;

    @Column({type: 'varchar', nullable: true})
    category?: string;

    @Column({type: 'varchar', nullable: true})
    note?: string;
}
