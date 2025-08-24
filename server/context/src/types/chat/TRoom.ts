import {
    Entity,
    Column,
    OneToMany,
    ManyToMany,
    JoinTable,
} from "typeorm";
import { TMessage } from "./TMessage";
import { TUser } from "types/base";
import { TEntityUserCreator } from "types/base/TEntityUserCreator";

@Entity()
export class TRoom extends TEntityUserCreator {

    @Column({ type: "varchar", length: 100 })
    name!: string;

    @Column({ type: "text", nullable: true })
    description?: string;

    @Column({ type: "tinyint", default: false })
    isPrivate!: boolean;

    @ManyToMany(() => TUser, (user) => user.rooms, { cascade: true })
    @JoinTable({
        name: "room_users",
        joinColumn: { name: "roomId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "userId", referencedColumnName: "id" },
    })
    users!: TUser[];

    /** Messages sent inside this room */
    @OneToMany(() => TMessage, (message) => message.room)
    messages!: TMessage[];
}
