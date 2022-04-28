import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    Column,
    UpdateDateColumn,
    OneToMany,

} from "typeorm";
import { Category } from "./Category";

@Entity()

export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string;

    @Column()
    description:string;

    @Column()
    price:number;

    @Column()
    stock:number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt:Date;
    @OneToMany(()=>Category,(category)=>category.products)
    categories:Category[]


}