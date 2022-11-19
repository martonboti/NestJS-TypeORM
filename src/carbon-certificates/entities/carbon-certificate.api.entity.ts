import { Column, Entity } from 'typeorm';
import { Node } from '../../common/entities/node.entity';
import { Status } from '../enums/status.enum';

@Entity('carbon_certificates')
export class CarbonCertificate extends Node {
    @Column('varchar', { length: 200 })
    country: string;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.AVAILABLE,
    })
    status: Status;

    @Column({ type: 'uuid', nullable: true })
    owner: string;
}
