import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CarbonCertificate } from './entities/carbon-certificate.api.entity';
import { CarbonCertificatesService } from './carbon-certificates.service';
import { FakeRepository } from '../common/tests/fakeRepository';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.api.entity';
import { Status } from './enums/status.enum';

describe('CarbonCertificatesService', () => {
    let service: CarbonCertificatesService;
    let usersService: UsersService;
    let carbonCertificateRepository: Repository<CarbonCertificate>;
    let usersRepository: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: getRepositoryToken(CarbonCertificate),
                    useClass: FakeRepository,
                },
                {
                    provide: getRepositoryToken(User),
                    useClass: FakeRepository,
                },
                CarbonCertificatesService,
                UsersService,
            ],
        }).compile();

        service = module.get<CarbonCertificatesService>(CarbonCertificatesService);
        usersService = module.get<UsersService>(UsersService);
        carbonCertificateRepository = module.get(getRepositoryToken(CarbonCertificate));
        usersRepository = module.get(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(usersService).toBeDefined();
        expect(usersRepository).toBeDefined();
        expect(carbonCertificateRepository).toBeDefined();
    });

    describe('getAvailable() test', () => {
        it('returns list of available certificates', async () => {
            const certificates = <CarbonCertificate[]>[];
            for (let i = 0; i < 4; i++) {
                certificates.push(
                    CarbonCertificate.of({
                        id: faker.datatype.uuid(),
                        country: faker.address.country(),
                    }),
                );
            }

            const carbonCertificateRepositoryFindSpy = jest
                .spyOn(carbonCertificateRepository, 'find')
                .mockResolvedValue(certificates);

            const result = await service.getAvailable();

            expect(result).toBe(certificates);
            expect(carbonCertificateRepositoryFindSpy).toHaveBeenCalledWith({
                select: ['id', 'country'],
                where: { status: Status.AVAILABLE },
            });
        });
    });

    describe('getOwnedByUser() test', () => {
        it('returns list of owned certificates by user', async () => {
            const certificates = <CarbonCertificate[]>[];
            const owner = faker.datatype.uuid();
            for (let i = 0; i < 4; i++) {
                certificates.push(
                    CarbonCertificate.of({
                        id: faker.datatype.uuid(),
                        country: faker.address.country(),
                        owner,
                    }),
                );
            }

            const carbonCertificateRepositoryFindSpy = jest
                .spyOn(carbonCertificateRepository, 'find')
                .mockResolvedValue(certificates);

            const result = await service.getOwnedByUser(owner);

            expect(result).toBe(certificates);
            expect(carbonCertificateRepositoryFindSpy).toHaveBeenCalledWith({
                select: ['id', 'country'],
                where: { owner },
            });
        });
    });

    describe('transferCertificate() test', () => {
        it('transfers certificate from one user to another successfully', async () => {
            const owner = faker.datatype.uuid();
            const carbonCertificateId = faker.datatype.uuid();
            const userId = faker.datatype.uuid();

            const certificate = CarbonCertificate.of({
                id: carbonCertificateId,
                country: faker.address.country(),
                status: Status.OWNED,
                owner,
            });

            const user = User.of({
                id: userId,
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
            });

            const carbonCertificateRepositoryFindSpy = jest
                .spyOn(carbonCertificateRepository, 'findOne')
                .mockResolvedValue(certificate);

            const userServiceFindOneSpy = jest.spyOn(usersService, 'findOne').mockResolvedValue(user);

            const result = await service.transferCertificate(owner, { userId, carbonCertificateId });

            expect(result).toStrictEqual({ message: 'Carbon certificate transfered successfully.' });
            expect(carbonCertificateRepositoryFindSpy).toHaveBeenCalledWith({
                where: { owner, id: carbonCertificateId },
            });
            expect(userServiceFindOneSpy).toHaveBeenCalledWith(userId);
        });
    });
});
