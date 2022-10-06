import { IsEmail, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUserDto{
  @IsEmail()
  @IsNotEmpty()
  email:string

  @IsNotEmpty()
  @MaxLength(24)
  firstName:string

  @IsNotEmpty()
  @MaxLength(24)
  lastName:string

  @IsNotEmpty()
  @MaxLength(24)
  password:string
}