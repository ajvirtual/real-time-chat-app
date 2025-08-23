import { Column, Entity } from "typeorm";
import { TSoftDeleteEntity } from "./TSoftDeleteEntity";

@Entity()
export class TFile extends TSoftDeleteEntity {
    @Column({ type: 'varchar', length: '255' })
    name: string;

    @Column({ type: 'varchar', length: '72', nullable: true })
    hash: string;

    @Column({ type: 'text', nullable: true })
    value?: string;
}