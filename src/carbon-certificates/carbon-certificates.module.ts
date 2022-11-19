import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarbonCertificate } from './entities/carbon-certificate.api.entity';
import { CarbonCertificatesController } from './carbon-certificates.controller';
import { CarbonCertificatesService } from './carbon-certificates.service';
import { UsersModule } from '../users/users.module';
import { SeedsCommand } from '../commands/seeds.command';
import { User } from '../users/entities/user.api.entity';

@Module({
    imports: [UsersModule, TypeOrmModule.forFeature([CarbonCertificate, User])],
    controllers: [CarbonCertificatesController],
    providers: [CarbonCertificatesService, SeedsCommand],
    exports: [CarbonCertificatesService],
})
export class CarbonCertificatesModule {}
