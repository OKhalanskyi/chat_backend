import { ValidateUserDetails } from "../utils/types";
import { User } from "../utils/typeorm";

export interface IAuthService{
  validateUser(UserCredentials:ValidateUserDetails):Promise<User|null>
}