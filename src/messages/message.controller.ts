import { Body, Controller, Inject, Post } from "@nestjs/common";
import { Routes, Services } from "../utils/constants";
import { IMessageService } from "./message.interface";
import { AuthUser } from "../utils/decorators";
import { User } from "../utils/typeorm";
import { CreateMessageDto } from "./dtos/createMessage.dto";

@Controller(Routes.MESSAGES)
export class MessageController{
  constructor(@Inject(Services.MESSAGES) private readonly messageService:IMessageService) {
  }
  @Post("")
  createMessage(@AuthUser() user:User, @Body() createMessageDto:CreateMessageDto){
    return this.messageService.createMessage({...createMessageDto,user})
  }
}