import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Node } from '../../common/entities/node.entity';
import { Status } from '../enums/status.enum';
import { User } from '../../users/entities/user.api.entity';

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

    @ManyToOne(() => User, (user) => user.certificates)
    @JoinColumn({ name: 'owner' })
    user?: User;

    public static of(params: Partial<CarbonCertificate>): CarbonCertificate {
        const carbonCertificate = new CarbonCertificate();
        Object.assign(carbonCertificate, params);
        return carbonCertificate;
    }
}
