import { ApiProperty } from '@nestjs/swagger';

export class CarbonCertificatePayload {
    @ApiProperty({ example: 'Denmark', description: 'Carbon certificate country.' })
    country: string;
}
