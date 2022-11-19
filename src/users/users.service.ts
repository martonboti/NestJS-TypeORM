import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.api.entity';

@Injectable()
export class UsersService {
    /**
     * Constructor, injects user repository
     */
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    /**
     * Finds one user by id
     * @param id user UUID
     * @returns user object
     */
    async findOne(id: string): Promise<User> {
        return await this.usersRepository.findOneBy({ id });
    }

    /**
     * Finds one user by email address
     * @param email user email address
     * @returns user object
     */
    async findByEmail(email: string): Promise<User> {
        return await this.usersRepository.findOneBy({ email });
    }
}