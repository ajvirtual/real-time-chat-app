import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { TFile } from "../base";
import { TMediaType } from "./TMediaType";
import { TMessageStatus } from "./TMessageStatus";
import { TEntityUserCreator } from "../base/TEntityUserCreator";
import { TUser } from "../base";
import { TRoom } from "./TRoom";

@Entity()
export class TMessage extends TEntityUserCreator {

  @ManyToOne(() => TUser, { lazy: true, nullable: true })
  @JoinColumn()
  sender?: TUser;

  @ManyToOne(() => TUser, { lazy: true, nullable: true })
  @JoinColumn()
  receiver?: TUser;

  @ManyToOne(() => TRoom, (room) => room.messages, { lazy: true, nullable: true })
  room?: TRoom;

  @Column({ type: 'varchar', nullable: true })
  content?: string;

  @Column({ type: 'varchar', nullable: true })
  reaction?: string;

  @ManyToOne(() => TFile, { lazy: true, nullable: true })
  media?: TFile;

  @Column({ type: "enum", enum: TMediaType, nullable: true })
  contentType?: TMediaType;

  @Column({ type: "enum", enum: TMessageStatus, nullable: true })
  status?: TMessageStatus;

  @Column({ type: "datetime", nullable: true })
  deliveredAt?: string;

  @Column({ type: "datetime", nullable: true })
  readAt?: string;

  @Column({ type: "datetime", nullable: true })
  editedAt?: string;

  @ManyToOne(() => TMessage, { lazy: true, nullable: true })
  parentMessage?: TMessage;
}