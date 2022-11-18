import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service dealing with app config based operations.
 */
@Injectable()
export class AppConfigService {
    constructor(private configService: ConfigService) {}

    get env(): string {
        return this.configService.get<string>('app.nodeEnv');
    }
    get url(): string {
        return this.configService.get<string>('app.url');
    }
    get port(): number {
        return parseInt(this.configService.get<string>('app.port'));
    }
}
