import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FakeRepository } from '../common/tests/fakeRepository';
import { User } from './entities/user.api.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
    let service: UsersService;
    let usersRepository: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: getRepositoryToken(User),
                    useClass: FakeRepository,
                },
                UsersService,
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        usersRepository = module.get(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(usersRepository).toBeDefined();
    });

    describe('findOne() test', () => {
        it('returns the found user', async () => {
            const userId = faker.datatype.uuid();

            const existingUser = User.of({
                id: userId,
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
            });

            const userRepositoryFindOneBySpy = jest.spyOn(usersRepository, 'findOneBy').mockResolvedValue(existingUser);

            const result = await service.findOne(userId);

            expect(result).toBe(existingUser);
            expect(userRepositoryFindOneBySpy).toHaveBeenCalledWith({ id: userId });
        });
    });

    describe('findByEmail() test', () => {
        it('returns the found user', async () => {
            const email = faker.internet.email();

            const existingUser = User.of({
                id: faker.datatype.uuid(),
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName(),
                email,
                password: faker.internet.password(),
            });

            const userRepositoryFindOneBySpy = jest.spyOn(usersRepository, 'findOneBy').mockResolvedValue(existingUser);

            const result = await service.findByEmail(email);

            expect(result).toBe(existingUser);
            expect(userRepositoryFindOneBySpy).toHaveBeenCalledWith({ email });
        });
    });
});
