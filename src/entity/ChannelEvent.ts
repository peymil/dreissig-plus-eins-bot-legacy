import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
} from "typeorm";

@Entity()
export default class ChannelEvent extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  event_name: string;

  @Column()
  channel_id: string;

  @CreateDateColumn()
  creation_date: Date;
}
