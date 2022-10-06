import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post, Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { Request, Response } from 'express'
import { Routes, Services } from "../utils/constants";
import { IAuthService } from "./auth.interface";
import { CreateUserDto } from "./dtos/createUser.dto";
import { IUserService } from "../users/user.interface";
import { instanceToPlain } from "class-transformer";
import { AuthenticatedGuard, LocalAuthGuard } from "./utils/Guards";

@Controller(Routes.AUTH)
export class AuthController{
  constructor(@Inject(Services.AUTH) private AuthService:IAuthService,
              @Inject(Services.USER) private userService:IUserService) {
  }
  @Post("register")
  @UsePipes(ValidationPipe)
  register(@Body() createUserDto:CreateUserDto){
    return instanceToPlain(this.userService.createUser(createUserDto))
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Res() res:Response){
    return res.send(HttpStatus.OK)
  }

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  status(@Req() req: Request, @Res() res: Response) {
    res.send(req.user)
  }


}