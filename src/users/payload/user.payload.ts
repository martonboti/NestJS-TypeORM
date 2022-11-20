import { ApiProperty } from '@nestjs/swagger';
import { CarbonCertificatePayload } from '../../carbon-certificates/payload/carbon-certificate.payload';

export class UserPayload {
    @ApiProperty({ example: '11c40a67-b784-4585-8f4d-68e79a0a032f', description: 'User UUID.' })
    id: string;

    @ApiProperty({ example: 'John', description: 'User firstname.' })
    firstname: string;

    @ApiProperty({ example: 'Doe', description: 'User lastname.' })
    lastname: string;

    @ApiProperty({ example: 'john-doe@email.test', description: 'User email address.' })
    email: string;

    @ApiProperty({ type: [CarbonCertificatePayload], description: 'List of carbon certificates owned by the user.' })
    certificates?: CarbonCertificatePayload[];
}
