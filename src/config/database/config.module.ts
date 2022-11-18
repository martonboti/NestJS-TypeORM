import Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config';
import { DBConfigService } from './config.service';

/**
 * Import and provide app configuration related classes.
 *
 */
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [config],
            validationSchema: Joi.object({
                DB_API_URL: Joi.string().default('postgresql://root:password@pg:5432/carbon_certificate_db'),
            }),
        }),
    ],
    providers: [ConfigService, DBConfigService],
    exports: [ConfigService, DBConfigService],
})
export class DBConfigModule {}
