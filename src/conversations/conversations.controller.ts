import { Body, Controller, Get, Inject, Param, Post, UseGuards } from "@nestjs/common";
import { Routes, Services } from "../utils/constants";
import { IConversationsService } from "./conversations.interface";
import { CreateConversationDto } from "./dtos/createConversation.dto";
import { AuthenticatedGuard } from "../auth/utils/Guards";
import { AuthUser } from "../utils/decorators";
import { Conversation, User } from "../utils/typeorm";

@Controller(Routes.CONVERSATIONS)
@UseGuards(AuthenticatedGuard)
export class ConversationsController{
  constructor(@Inject(Services.CONVERSATION) private readonly conversationService:IConversationsService) {
  }

  @Post()
  async createConversation(@AuthUser() user:User, @Body() createConversationDto:CreateConversationDto){
    console.log("works")
    return this.conversationService.createConversation(user, createConversationDto)
  }

  @Get()
  async getConversations(@AuthUser(){id}:User){
    return this.conversationService.getConversations(id)
  }

  @Get(':id')
  async getConversationById(@Param('id') id: number) {
    const conversation = await this.conversationService.findConversationById(
      id,
    );
    return conversation;
  }
}