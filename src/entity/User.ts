import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    Unique
}
    from "typeorm";
import { Length,IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";

@Entity()
@Unique(['username'])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(4,20)
    nombre: string;

    @Column()
    @Length(4,20)
    username: string;

    @Column()
    @Length(4,100)
    password: string;

    @Column()
    @IsNotEmpty()
    role: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    
    hashPassword(){
        this.password = bcrypt.hashSync(this.password,8);
    }
    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
      }

}