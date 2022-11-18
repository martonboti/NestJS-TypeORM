import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/app/config.module';
import { DBConfigModule } from './config/database/config.module';
import { DBConfigService } from './config/database/config.service';

@Module({
    imports: [
        AppConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [DBConfigModule],
            useFactory: (dbConfig: DBConfigService) => ({
                type: 'postgres',
                url: dbConfig.dbApiUrl,
                ssl: false,
                synchronize: false,
                entities: ['dist/**/*.api.entity{.ts,.js}'],
            }),
            inject: [DBConfigService],
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
