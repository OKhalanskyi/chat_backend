import { Conversation, User } from "./typeorm";

export type CreateUserDetails={
  email:string
  firstName:string
  lastName:string
  password:string
}

export type ValidateUserDetails={
  email:string
  password:string
}

export type FindUserParams=Partial<{
  id:number
  email:string
}>

export interface AuthenticatedRequest extends Request {
  user: User;
}

export type CreateConversationParams = {
  receiverId:number
  message:string
}

export type CreateMessageParams = {
  user:User
  content:string
  conversationId:number
}
