import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with app config based operations.
 */
@Injectable()
export class DBConfigService {
    constructor(private configService: ConfigService) {}

    get dbApiUrl(): string {
        return this.configService.get<string>('db.dbApiUrl');
    }
}
