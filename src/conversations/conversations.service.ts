import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IConversationsService } from "./conversations.interface";
import { CreateConversationParams } from "../utils/types";
import { InjectRepository } from "@nestjs/typeorm";
import { Conversation, User } from "../utils/typeorm";
import { Repository } from "typeorm";
import { Services } from "../utils/constants";
import { IUserService } from "../users/user.interface";

@Injectable()
export class ConversationsService implements IConversationsService{
  constructor(@InjectRepository(Conversation) private readonly conversationRepository:Repository<Conversation>,
              @Inject(Services.USER) private readonly userService:IUserService) {}

  async createConversation(user:User, conversationParams: CreateConversationParams) {
    const {receiverId} = conversationParams
    if(user.id === conversationParams.receiverId){
      throw new HttpException("Can not create a conversation", HttpStatus.BAD_REQUEST)
    }

    const existingConversation = await this.conversationRepository.findOne({
      where:[{
        creator:{id:user.id},
        receiver:{id:receiverId}
      }, {
          creator:{id:receiverId},
          receiver:{id:user.id}
        }]
    })
    if(existingConversation){
      throw new HttpException("Conversation exists", HttpStatus.CONFLICT)
    }

    const receiver = await this.userService.findUser({id:receiverId})
    if(!receiver){
      throw new HttpException("Receiver not found", HttpStatus.BAD_REQUEST)
    }

    const conversation = await this.conversationRepository.create({
      creator:user,
      receiver:receiver
    })
    return this.conversationRepository.save(conversation)
  }

  async getConversations(id:number):Promise<Conversation[]>{
    return this.conversationRepository.createQueryBuilder('conversation')
      .leftJoin('conversation.creator', 'creator')
      .addSelect([
        'creator.id',
        'creator.firstName',
        'creator.lastName',
        'creator.email',
      ])
      .leftJoin('conversation.receiver', 'receiver')
      .addSelect([
        'receiver.id',
        'receiver.firstName',
        'receiver.lastName',
        'receiver.email',
      ])
      .where('creator.id = :id', { id })
      .orWhere('receiver.id = :id', { id })
      .orderBy('conversation.id', 'DESC')
      .getMany();
  }

  async findConversationById(id:number):Promise<Conversation>{
    return this.conversationRepository.findOne({where:{id},
    relations:['creator', 'receiver', 'messages']})
  }
}