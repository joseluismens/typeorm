import { Entity, Column, PrimaryGeneratedColumn ,CreateDateColumn,UpdateDateColumn, BaseEntity } from "typeorm";


@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    firstname: string;

    @Column()
    lastname:string;

    @Column()
    active:boolean;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()    
    updatedAt:Date;

}