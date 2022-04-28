import { Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
    
    } from "typeorm";
    import { Assistence } from "./Assistence";
    @Entity()
    
    export class Client extends BaseEntity{
        @PrimaryGeneratedColumn()
        id:number;
        
        @Column()
        name: string;

        @Column()
        lastname:string;

        @Column()
        rut:string;

        @Column({
            default:'NULL'
        })
        gender:string;
        
        @Column()
        phone:string;

        
        @Column()
        hight:number;
        
        @Column()
        weigth:number
        
        @CreateDateColumn()
        createdAt: Date;
    
        @UpdateDateColumn()
        updatedAt: Date;

        @OneToMany(()=>Assistence,(assistence)=>assistence.client)
        assistences:Assistence[]

    }