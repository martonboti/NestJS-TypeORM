import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { AppConfigService } from '../config/app/config.service';
import { handleErrors } from '../common/utils/errors';
import { LoginDto } from './dto/login.dto';
import { LoginPayload } from './payload/login.payload';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    logger = new Logger('AuthService');

    constructor(
        private readonly jwtService: JwtService,
        private readonly appConfig: AppConfigService,
        private readonly usersService: UsersService,
    ) {}

    /**
     * Find user by id.
     * @param userId - uuid of the user
     */
    public async validateUser(userId: string) {
        try {
            return await this.usersService.findOne(userId);
        } catch (exception) {
            return null;
        }
    }

    /**
     * Login user
     * @param loginData - login input object
     * @return object containing the access token
     */
    public async login(loginData: LoginDto): Promise<LoginPayload> {
        try {
            // Fetch user by email address
            const user = await this.usersService.findByEmail(loginData.email);
            if (!user) {
                throw new UnauthorizedException();
            }

            // Compare password hash
            const result = await this.compare(loginData.password, user.password);
            if (!result) {
                throw new UnauthorizedException();
            }

            // Generate access token
            const accessToken = this.jwtService.sign(
                {
                    sub: user.id,
                    name: `${user.firstname} ${user.lastname}`,
                    email: user.email,
                },
                {
                    secret: this.appConfig.jwtSecret,
                    expiresIn: this.appConfig.jwtExpiry,
                },
            );

            return { accessToken };
        } catch (exception) {
            this.logger.log('Login failed.');
            handleErrors(exception);
        }
    }

    /**
     * Compare password against the db hash
     * @param password - password string
     * @param hash - stored password hash
     */
    private async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}
