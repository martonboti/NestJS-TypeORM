import Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config';
import { AppConfigService } from './config.service';

/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
    imports: [
        ConfigModule.forRoot({
            load: [config],
            validationSchema: Joi.object({
                NODE_ENV: Joi.string().valid('development', 'production', 'test', 'sandbox').default('development'),
                APP_URL: Joi.string().default('http://localhost:8080'),
                PORT: Joi.number().default(8080),
            }),
        }),
    ],
    providers: [ConfigService, AppConfigService],
    exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
