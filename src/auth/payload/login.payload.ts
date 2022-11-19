import { ApiProperty } from '@nestjs/swagger';

export class LoginPayload {
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsI...', description: 'Access token JWT.' })
    accessToken: string;
}
