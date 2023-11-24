import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { AbstractEntity } from "./abstractEntity";
// import * as yup from "yup"

export enum ToolTypeEnum {
    Bound = 'bound',
    Cash = 'cash'
}

@Entity()
export class Tool extends AbstractEntity {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({type: 'varchar', nullable: true,})
    externalId!: string;

    @Column({type: 'varchar',})
    name!: string;

    @Column({type: 'varchar', nullable: true,})
    fullName?: string;

    @Column({type: 'boolean',default: true,})
    isUser?: boolean;

    @Column({type: 'boolean',default: false,})
    isArhive?: boolean;

    @Column({type: 'varchar',})
    type?: string;

    @Column({type: 'decimal', default: 0})
    currentSum?: number;

    @Column({type: 'decimal', default: 0})
    prevSum?: number;
}
