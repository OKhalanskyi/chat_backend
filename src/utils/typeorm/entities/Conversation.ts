import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Message } from "./Message";

@Entity({name:"conversations"})
@Index(['creator.id', 'receiver.id'], { unique: true })
export class Conversation{
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn()
  creator: User;

  @OneToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn()
  receiver: User;

  @OneToMany(()=>Message, (messages)=>messages.conversation,
    {cascade:['insert','remove','update']})
  @JoinColumn()
  messages:Message[]

  @Column({ name: 'created_at' })
  createdAt: number;

  @OneToOne(() => Message)
  @JoinColumn({ name: 'last_message_sent' })
  lastMessageSent: Message;
}