import { cp } from "fs";
import { BaseEntity, Entity ,PrimaryGeneratedColumn,
    CreateDateColumn,
    Column,
    ManyToMany,
    OneToMany
} from "typeorm";
import { Product } from "./Product";

@Entity()
export class Category extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre:string;

    @CreateDateColumn()
    createAt: string

   @OneToMany(()=>Product,(product)=>product.categories)
   products:Product[]
}