import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export abstract class Node {
    @PrimaryGeneratedColumn('uuid')
    id: string;
}
