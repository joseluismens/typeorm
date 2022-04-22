import { Entity, Column, PrimaryGeneratedColumn ,CreateDateColumn,UpdateDateColumn, BaseEntity } from "typeorm";


@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    @Column()
    password:string;
    @Column({
        nullable:true
    })
    firstname: string;

    @Column({
        nullable:true
    })
    lastname:string;

    @Column({
        default:true
    })

    active:boolean;

   
    
    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()    
    updatedAt:Date;

}