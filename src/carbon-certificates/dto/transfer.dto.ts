import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class TransferDto {
    @ApiProperty({
        example: '0f1ef957-c779-4d9a-b89f-eebcbfc53c4e',
        description: 'UUID of the carbon certificate which should be transfered.',
    })
    @IsUUID()
    carbonCertificateId: string;

    @ApiProperty({
        example: '051ce801-e219-43d3-988b-b15bffdfb47c',
        description: 'UUID of the user to whom the certificate should be transfered to.',
    })
    @IsUUID()
    userId: string;
}
