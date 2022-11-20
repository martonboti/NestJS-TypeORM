import { Get, Controller, UseInterceptors, HttpCode, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiUnauthorizedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { UserPayload } from './payload/user.payload';
import { UsersService } from './users.service';

@Controller('/v1/users')
@UseInterceptors(LoggingInterceptor)
@UseGuards(JwtAuthGuard)
@ApiTags('users')
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @Get()
    @HttpCode(200)
    @ApiOperation({ summary: 'Get all users. For testing purposes' })
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Logged in succesfully.', type: [UserPayload] })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    getUsers(): Promise<UserPayload[]> {
        return this.service.getUsers();
    }
}
