import { Body, Post, Controller, UseInterceptors, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { LoginDto } from './dto/login.dto';
import { LoginPayload } from './payload/login.payload';

@Controller('/v1/auth')
@UseInterceptors(LoggingInterceptor)
@ApiTags('auth')
export class AuthController {
    constructor(private readonly service: AuthService) {}

    @Post('/login')
    @HttpCode(200)
    @ApiOperation({ summary: 'Login user.' })
    @ApiOkResponse({ description: 'Logged in succesfully.', type: LoginPayload })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    login(@Body() body: LoginDto): Promise<LoginPayload> {
        return this.service.login(body);
    }
}
