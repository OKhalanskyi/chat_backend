import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IUserService } from "./user.interface";
import { CreateUserDetails, FindUserParams } from "../utils/types";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../utils/typeorm";
import { hashPassword } from "../utils/helpers";

@Injectable()
export class UserService implements IUserService{
  constructor(@InjectRepository(User) private readonly userRepository:Repository<User>) {
  }
  async createUser(userDetails:CreateUserDetails) {
    const existingUser = await this.userRepository.findOne({email:userDetails.email})
    if(existingUser){
      throw new HttpException("User already exists",HttpStatus.CONFLICT)
    }
    const password = await hashPassword(userDetails.password)
    const newUser = this.userRepository.create({...userDetails, password})
    return this.userRepository.save(newUser)
  }
  async findUser(findUserDetails:FindUserParams){
    return this.userRepository.findOne(findUserDetails)
  }
}