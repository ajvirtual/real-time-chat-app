import { DeleteDateColumn } from 'typeorm';
import { TTimeStamp } from './TTimeStamp';

export class TSoftDeleteEntity extends TTimeStamp {
    @DeleteDateColumn({ nullable: true })
    deletedAt?: string;
}