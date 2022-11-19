import { Get, Put, Body, Controller, UseInterceptors, HttpCode, UseGuards } from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiOkResponse,
    ApiUnauthorizedResponse,
    ApiBearerAuth,
    ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CarbonCertificatePayload } from './payload/carbon-certificate.payload';
import { CarbonCertificatesService } from './carbon-certificates.service';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { UserType } from '../users/types/user.type';
import { TransferDto } from './dto/transfer.dto';
import { TransferPayload } from './payload/transfer.payload';

@Controller('/v1/carbon-certificates')
@UseInterceptors(LoggingInterceptor)
@UseGuards(JwtAuthGuard)
@ApiTags('carbon-certificates')
export class CarbonCertificatesController {
    constructor(private readonly carbonCertificatesService: CarbonCertificatesService) {}

    @Get('/available')
    @HttpCode(200)
    @ApiOperation({ summary: 'Get available carbon certificates.' })
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Ok.', type: [CarbonCertificatePayload] })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    getAvailable(): Promise<CarbonCertificatePayload[]> {
        return this.carbonCertificatesService.getAvailable();
    }

    @Get('/owned-by-user')
    @HttpCode(200)
    @ApiOperation({ summary: 'Get list of carbon certificates owned by the current user.' })
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Ok.', type: [CarbonCertificatePayload] })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    getOwnedByUser(@CurrentUser() { id }: UserType): Promise<CarbonCertificatePayload[]> {
        return this.carbonCertificatesService.getOwnedByUser(id);
    }

    @Put('/transfer')
    @HttpCode(200)
    @ApiOperation({ summary: "Transfer current user's carbon certificate to the another existing user." })
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Ok.', type: TransferPayload })
    @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
    @ApiNotFoundResponse({ description: 'Not Found.' })
    transferCertificate(@CurrentUser() { id }: UserType, @Body() body: TransferDto): Promise<TransferPayload> {
        return this.carbonCertificatesService.transferCertificate(id, body);
    }
}
