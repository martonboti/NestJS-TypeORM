import { ApiProperty } from '@nestjs/swagger';

export class TransferPayload {
    @ApiProperty({
        example: 'Carbon certificate transfered successfully.',
        description: 'Message describing the outcome of the transfer.',
    })
    message: string;
}
