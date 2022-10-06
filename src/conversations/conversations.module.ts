import { Module } from '@nestjs/common';
import { Services } from "../utils/constants";
import { ConversationsService } from "./conversations.service";
import { ConversationsController } from "./conversations.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Conversation } from "../utils/typeorm";
import { UserModule } from "../users/user.module";

@Module({
  imports:[TypeOrmModule.forFeature([Conversation]),UserModule],
  controllers:[ConversationsController],
  providers: [{
    provide:Services.CONVERSATION,
    useClass:ConversationsService
  }]
})
export class ConversationsModule {}