import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: 'boti@email.com', description: 'User email address.' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'SuperSecretPassword', description: 'User password.' })
    @IsString()
    @MinLength(8)
    password: string;
}
