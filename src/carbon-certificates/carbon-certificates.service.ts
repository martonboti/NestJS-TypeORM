import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarbonCertificate } from './entities/carbon-certificate.api.entity';
import { handleErrors } from '../common/utils/errors';
import { Status } from './enums/status.enum';
import { TransferDto } from './dto/transfer.dto';
import { TransferPayload } from './payload/transfer.payload';
import { UsersService } from '../users/users.service';

@Injectable()
export class CarbonCertificatesService {
    logger = new Logger('CarbonCertificatesService');

    constructor(
        @InjectRepository(CarbonCertificate)
        private carbonCertificateRepository: Repository<CarbonCertificate>,
        private usersService: UsersService,
    ) {}

    /**
     * Finds one certificate by id
     * @param id carbon certificate UUID
     * @returns carbon certificate object
     */
    async findOne(id: string): Promise<CarbonCertificate> {
        return await this.carbonCertificateRepository.findOneBy({ id });
    }

    /**
     * Return list of available carbon certificates
     * @returns array of carbon certificates
     */
    async getAvailable(): Promise<CarbonCertificate[]> {
        return await this.carbonCertificateRepository.find({
            select: ['id', 'country'],
            where: { status: Status.AVAILABLE },
        });
    }

    /**
     * Return list of carbon certificate owned by a user
     * @param userId user UUID
     * @returns array of carbon certificates
     */
    async getOwnedByUser(userId: string): Promise<CarbonCertificate[]> {
        return await this.carbonCertificateRepository.find({
            select: ['id', 'country'],
            where: { owner: userId },
        });
    }

    /**
     * Transfer carbon certificate from one user to another
     * @param userId UUID of the user owning the certificate
     * @param body body object, containing certificate and user UUIDs
     */
    async transferCertificate(userId: string, body: TransferDto): Promise<TransferPayload> {
        try {
            const [certificate, user] = await Promise.all([
                this.carbonCertificateRepository.findOne({
                    where: { owner: userId, id: body.carbonCertificateId },
                }),
                this.usersService.findOne(body.userId),
            ]);

            if (!user) {
                throw new HttpException("User doesn't exists by that id.", HttpStatus.NOT_FOUND);
            }

            if (!certificate) {
                throw new HttpException("You don't have a carbon certificate by that id.", HttpStatus.NOT_FOUND);
            }

            certificate.status = Status.TRANSFERED;
            certificate.owner = user.id;
            await this.carbonCertificateRepository.save(certificate);

            return { message: 'Carbon certificate transfered successfully.' };
        } catch (exception) {
            this.logger.warn('Transfer failed.');
            handleErrors(exception);
        }
    }
}
