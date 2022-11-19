import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { AppConfigModule } from '../config/app/config.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [AppConfigModule, UsersModule, PassportModule],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, JwtService],
})
export class AuthModule {}
