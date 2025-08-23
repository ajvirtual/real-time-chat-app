import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { TMessage } from "..";
import { TFile } from "./TFile";
import { TSoftDeleteEntity } from "./TSoftDeleteEntity";

@Entity()
export class TUser extends TSoftDeleteEntity {
    @Column({ type: 'varchar', length: 50 })
    userName?: string;

    @Column({ type: 'varchar', length: 50 })
    userNameTolower?: string;

    @Column({ type: 'varchar'})
    email?: string;

    @OneToMany(() => TMessage, (message) => message.sender, { nullable: true, lazy: true })
    sentMessages?: TMessage[];

    @OneToMany(() => TMessage, (message) => message.receiver, { nullable: true, lazy: true })
    receivedMessages?: TMessage[];

    @Column({ type: 'varchar', length: '100', nullable: true })
    password?: string;

    @Column({ type: 'varchar', length: '10', nullable: true })
    resetPasswordCode?: string;

    @Column({ type: 'varchar', length: '100', nullable: true })
    resetPasswordToken?: string;

    @Column({ type: 'datetime', nullable: true })
    dateResetPasswordCreated?: string;

    @Column({ type: 'datetime', nullable: true })
    dateEditPassword?: string;

    @Column({ type: 'datetime', nullable: true })
    dateInscriptionConfirmed?: string;

    @Column({ type: 'datetime', nullable: true })
    dateInscriptionToken?: string;

    @Column({ type: 'datetime', nullable: true })
    dateBirth?: string;

    @Column({ type: 'varchar', length: '255', nullable: true })
    birthPlace?: string;

    @Column({ type: 'varchar', length: '100', nullable: true })
    inscriptionToken?: string;

    @Column({ type: 'tinyint', default: false })
    isDisabled?: boolean;

    @Column({ type: 'varchar', nullable: true })
    disableReason?: string;

    @Column({ type: 'varchar', nullable: true })
    firstName?: string;

    @Column({ type: 'varchar', nullable: true })
    lastName?: string;

    @Column({ type: 'varchar', nullable: true })
    preferredName?: string;

    @Column({ type: 'varchar', nullable: true })
    fullName?: string;

    @Column({ type: 'varchar', nullable: true, default: 'UNKNOWN' })
    sexe?: 'MALE' | 'FEMALE' | 'UNKNOWN';

    @Column({ type: 'varchar', nullable: true })
    nationality?: string;

    @Column({ type: 'varchar', nullable: true })
    language?: string;

    @Column({ type: 'varchar', nullable: true })
    address?: string;

    @Column({ type: 'varchar', nullable: true })
    phone?: string;

    @Column({ type: 'varchar', nullable: true })
    whatsappNumber?: string;

    @Column({ type: 'tinyint', default: false })
    notificationEmail?: boolean;

    @Column({ type: 'tinyint', default: true })
    profilePublic?: boolean;

    @ManyToOne(() => TUser, { lazy: true, nullable: true })
    userCreator?: TUser;

    @Column({ type: 'varchar', nullable: true })
    companyName?: string;

    @Column({ type: 'varchar', nullable: true })
    companyPosition?: string;

    @ManyToOne(() => TFile, { lazy: true, nullable: true })
    profilePicture?: TFile;

    @ManyToOne(() => TFile, { lazy: true, nullable: true })
    coverPicture?: TFile;

}