import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from './config/app/config.module';
import { AppConfigService } from './config/app/config.service';
import { AuthModule } from './auth/auth.module';
import { CarbonCertificatesModule } from './carbon-certificates/carbon-certificates.module';
import { DBConfigModule } from './config/database/config.module';
import { DBConfigService } from './config/database/config.service';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        AppConfigModule,
        AuthModule,
        CarbonCertificatesModule,
        UsersModule,
        TypeOrmModule.forRootAsync({
            imports: [DBConfigModule, AppConfigModule],
            useFactory: (dbConfig: DBConfigService, appConfig: AppConfigService) => ({
                type: 'postgres',
                url: dbConfig.dbApiUrl,
                ssl: false,
                synchronize: appConfig.env !== 'production',
                entities: ['dist/**/*.api.entity{.ts,.js}'],
            }),
            inject: [DBConfigService, AppConfigService],
        }),
    ],
})
export class AppModule {}
