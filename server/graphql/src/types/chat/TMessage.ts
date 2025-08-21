import { TFile, TQueryResponse, TUser } from "@_types/base";
import { Metadata } from "@mzara/graphql-service-core";
import { MetadataClass } from "@mzara/graphql-service-core";
import { Field, ObjectType } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { TMediaType } from "./TMediaType";
import { TMessageStatus } from "./TMessageStatus";
import { TEntityUserCreator } from "@_types/base/TEntityUserCreator";

@Entity()
@ObjectType()
@MetadataClass({
  name: "message",
})

export class TMessage extends TEntityUserCreator {

  @Field(() => TUser, { nullable: true })
  @OneToOne(() => TUser, { lazy: true, nullable: true })
  @JoinColumn()
  @Metadata({ relation: 'TUser' })
  sender?: TUser

  @Field(() => TUser, { nullable: true })
  @OneToOne(() => TUser, { lazy: true, nullable: true })
  @JoinColumn()
  @Metadata({ relation: 'TUser' })
  receiver?: TUser

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  @Metadata()
  room?: string // dm:<minId>:<maxId>

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  @Metadata()
  content?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  @Metadata()
  reaction?: string;

  @Field(() => TFile, { nullable: true })
  @ManyToOne(() => TFile, { lazy: true, nullable: true })
  @Metadata({ relation: 'TFile' })
  media?: TFile

  @Field(() => TMediaType, { nullable: true })
  @Column({ type: "enum", enum: TMediaType, nullable: true })
  @Metadata()
  contentType?: TMediaType;

  @Field(() => TMessageStatus, { nullable: true })
  @Column({ type: "enum", enum: TMessageStatus, nullable: true })
  @Metadata()
  status?: TMessageStatus;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'datetime', nullable: true })
  @Metadata({ searchable: false })
  deliveredAt?: string

  @Field(() => Date, { nullable: true })
  @Column({ type: 'datetime', nullable: true })
  @Metadata({ searchable: false })
  readAt?: string

  @Field(() => TMessage, { nullable: true })
  @ManyToOne(() => TMessage, { lazy: true, nullable: true })
  @Metadata({ relation: 'TMessage' })
  parentMessage?: TMessage
  
}

@ObjectType()
export class TTMessagesResponse extends TQueryResponse {
  @Field(() => [TMessage])
  data: TMessage[];
}
