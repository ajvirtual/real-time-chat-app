import { CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { TBase } from './TBase';

@Entity()
export class TTimeStamp extends TBase {
    @CreateDateColumn()
    createdAt: string;

    @UpdateDateColumn({ nullable: true, onUpdate: undefined })
    updatedAt?: string;
}