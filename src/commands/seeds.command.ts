import { Command, CommandRunner } from 'nest-commander';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CarbonCertificate } from '../carbon-certificates/entities/carbon-certificate.api.entity';
import { Status } from '../carbon-certificates/enums/status.enum';
import { User } from '../users/entities/user.api.entity';
import { UserType } from '../users/types/user.type';

@Command({
    name: 'run-seeds',
})
export class SeedsCommand extends CommandRunner {
    private readonly logger = new Logger(SeedsCommand.name);
    private userNr = 10;
    private certNr = 100;
    private assignNr = 5;

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(CarbonCertificate)
        private carbonCertificateRepository: Repository<CarbonCertificate>,
    ) {
        super();
    }

    async run(): Promise<void> {
        await this.carbonCertificateRepository.query('DELETE FROM carbon_certificates');
        await this.usersRepository.query('DELETE FROM users');

        // Seed users table
        const users = <UserType[]>[];
        for (let i = 0; i < this.userNr; i++) {
            const email = faker.internet.email();
            this.logger.log(`Generating user: ${email}`);
            users.push({
                id: uuidv4(),
                firstname: faker.name.firstName(),
                lastname: faker.name.lastName(),
                email,
                password: '1234qwer',
            });
        }

        const userEntities = this.usersRepository.create(users);
        await this.usersRepository.insert(userEntities);

        // Seed carbon certificates table
        const certificates = <CarbonCertificate[]>[];
        for (let i = 0; i < this.certNr; i++) {
            certificates.push({
                id: uuidv4(),
                country: faker.address.country(),
                status: Status.AVAILABLE,
                owner: null,
            });
        }

        // Get random users and assign a certificate to each
        const randomUsers = users.sort(() => Math.random() - Math.random()).slice(0, this.assignNr);
        randomUsers.forEach((user) => {
            for (let i = 0; i < this.RNG(3, 10); i++) {
                this.assignUserToCertificate(certificates, user);
            }
        });

        const certEntities = this.carbonCertificateRepository.create(certificates);
        await this.carbonCertificateRepository.insert(certEntities);

        return;
    }

    /**
     * Assign user to a certificate.
     * In case the random certificate is taken, try again.
     * @param certificates array of certificates
     * @param user user object
     */
    private assignUserToCertificate = (certificates: CarbonCertificate[], user: UserType): void => {
        const index = Math.floor(Math.random() * certificates.length);
        if (!certificates[index].owner) {
            certificates[index].owner = user.id;
            certificates[index].status = Status.OWNED;

            this.logger.log(`Adding certificate to user: ${user.email}`);
        } else {
            this.assignUserToCertificate(certificates, user);
        }
    };

    /**
     * Random number generator between min/max values
     * @param min - minimum value
     * @param max - maximum value
     * @return random number
     */
    private RNG = (min: number, max: number): number => Math.floor(Math.random() * (max - min) + min);
}
