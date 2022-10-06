import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Conversation, User } from "../index";

@Entity({name:"messages"})
export class Message{
  @PrimaryGeneratedColumn()
  id:number

  @Column()
  content:string

  @CreateDateColumn({name:'created_at'})
  createdAt:number

  @ManyToOne(()=>User,(user)=>user.messages)
  author:User

  @ManyToOne(()=>Conversation, (conversation)=>conversation.messages)
  conversation:Conversation
}