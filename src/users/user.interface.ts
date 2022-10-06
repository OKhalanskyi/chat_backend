import { CreateUserDetails, FindUserParams, ValidateUserDetails } from "../utils/types";
import { User } from "../utils/typeorm";

export interface IUserService{
  createUser(userDetails:CreateUserDetails):Promise<User>
  findUser(findUserDetails:FindUserParams):Promise<User>
}