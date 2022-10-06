import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IMessageService } from "./message.interface";
import { CreateMessageParams } from "../utils/types";
import { Message } from "../utils/typeorm/entities/Message";
import { Repository } from "typeorm";
import { Conversation, User } from "../utils/typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { instanceToPlain } from "class-transformer";

@Injectable()
export class MessageService implements IMessageService{
  constructor(@InjectRepository(Message) private readonly messageRepository:Repository<Message>,
              @InjectRepository(Conversation) private readonly conversationRepository:Repository<Conversation>) {}

  async createMessage({ user, content, conversationId }:CreateMessageParams): Promise<Message> {
    const conversation = await this.conversationRepository.findOne({where:
        {id:conversationId},
        relations:['creator','receiver']})
    if(!conversation){
      throw new HttpException("conversation not found" ,HttpStatus.BAD_REQUEST)
    }
    const {creator , receiver} = conversation
    if(creator.id!==user.id && receiver.id!==user.id){
      throw new HttpException("Can not create message", HttpStatus.FORBIDDEN)
    }

    const newMessage = this.messageRepository.create({
      content,
      conversation,
      author:instanceToPlain(user)
    })

    const savedMessage = await this.messageRepository.save(newMessage)
    conversation.lastMessageSent = savedMessage
    await this.conversationRepository.save(conversation)
    return
  }

}