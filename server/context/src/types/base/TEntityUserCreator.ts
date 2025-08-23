import { Column, Entity, ManyToOne } from 'typeorm';
import { TSoftDeleteEntity } from './TSoftDeleteEntity';
import { TUser } from './TUser';

@Entity()
export class TEntityUserCreator extends TSoftDeleteEntity {

    @ManyToOne(() => TUser, { lazy: true, nullable: true })
    userCreator?: TUser
}
