import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AppConfigService } from '../../config/app/config.service';
import { AuthService } from '../auth.service';
import { Token } from '../interfaces/token.interface';
import { User } from '../../users/entities/user.api.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(appConfig: AppConfigService, private readonly auth: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: appConfig.jwtSecret,
        });
    }

    /**
     * Validate user from jwt token
     * @param payload jwt token payload
     * @returns user object
     */
    async validate(payload: Token): Promise<User> {
        const user = await this.auth.validateUser(payload.sub);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
