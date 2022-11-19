import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import bcrypt from 'bcrypt';
import { Node } from '../../common/entities/node.entity';

@Entity('users')
export class User extends Node {
    @Column('varchar', { length: 200 })
    firstname: string;

    @Column('varchar', { length: 200 })
    lastname: string;

    @Column('varchar', { length: 300 })
    email: string;

    @Column('varchar', { length: 60 })
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    public static of(params: Partial<User>): User {
        const user = new User();
        Object.assign(user, params);
        return user;
    }
}
