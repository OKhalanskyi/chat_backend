import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Conversation } from "../utils/typeorm";
import { Message } from "../utils/typeorm/entities/Message";
import { Services } from "../utils/constants";
import { MessageService } from "./message.service";
import { MessageController } from "./message.controller";

@Module({
  imports:[TypeOrmModule.forFeature([Conversation, Message])],
  providers:[{
    provide:Services.MESSAGES,
    useClass:MessageService
  }],
  controllers:[MessageController]
})

export class MessageModule{}