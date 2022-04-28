import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,

} from "typeorm";
import { Client } from "./Client";

@Entity()

export class Assistence extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createAt: string

    @ManyToOne(() => Client, (client) => client.assistences)
    client: Client
}