import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { Message } from "./Message";

@Entity({name:"users"})
export class User{
  @PrimaryGeneratedColumn()
  id:number

  @Column({unique:true})
  email:string

  @Column()
  firstName:string

  @Column()
  lastName:string

  @Column()
  @Exclude()
  password:string

  @OneToMany(()=>Message,(messages)=>messages.author)
  @JoinColumn()
  messages:Message[]
}