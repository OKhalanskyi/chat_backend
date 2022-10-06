import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateConversationDto{

  @IsNumber()
  @IsNotEmpty()
  receiverId:number

  @IsString()
  @IsNotEmpty()
  message:string
}