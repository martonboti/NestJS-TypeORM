import { ApiProperty } from '@nestjs/swagger';

export class CarbonCertificatePayload {
    @ApiProperty({ example: '21c40a67-b784-4585-8f4d-68e79a0a032f', description: 'Carbon certificate UUID.' })
    id: string;

    @ApiProperty({ example: 'Denmark', description: 'Carbon certificate country.' })
    country: string;
}
