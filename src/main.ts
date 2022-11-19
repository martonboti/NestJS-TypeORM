import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app/config.service';

const logger: Logger = new Logger('Main');

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });

    const appConfig: AppConfigService = app.get(AppConfigService);

    app.useGlobalPipes(new ValidationPipe());

    if (appConfig.env !== 'production') {
        const config = new DocumentBuilder()
            .setTitle('Carbon Certificate API')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api/v1/api-docs', app, document);
    }

    await app.listen(appConfig.port);

    logger.log(`API is listening on the ${appConfig.port} PORT on ${appConfig.env} environment.`);
}
bootstrap();
