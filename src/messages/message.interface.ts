import { User } from "../utils/typeorm";
import { CreateMessageParams } from "../utils/types";
import { Message } from "../utils/typeorm/entities/Message";

export interface IMessageService{
  createMessage(params:CreateMessageParams):Promise<Message>
}