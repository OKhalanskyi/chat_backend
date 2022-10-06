import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IAuthService } from "./auth.interface";
import { Services } from "../utils/constants";
import { IUserService } from "../users/user.interface";
import { ValidateUserDetails } from "../utils/types";
import { comparePasswords } from "../utils/helpers";

@Injectable()
export class AuthService implements IAuthService{
  constructor(@Inject(Services.USER) private readonly userService:IUserService) {
  }
  async validateUser(userCredentials:ValidateUserDetails) {
    const user = await this.userService.findUser({email:userCredentials.email})
    if(!user){
      throw new HttpException("invalid data" , HttpStatus.UNAUTHORIZED)
    }
    const isPasswordValid = await comparePasswords(userCredentials.password, user.password)
    return isPasswordValid?user:null
  }
}