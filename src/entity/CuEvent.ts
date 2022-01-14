import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CuEvent {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    channelId!: string;
}