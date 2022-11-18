import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/config.service';

const logger: Logger = new Logger('Main');

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    const appConfig: AppConfigService = app.get(AppConfigService);

    await app.listen(appConfig.port);

    logger.log(`API is listening on the ${appConfig.port} PORT on ${appConfig.env} environment.`);
}
bootstrap();
