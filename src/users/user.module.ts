import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { Services } from "../utils/constants";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../utils/typeorm";

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  providers: [{
    provide:Services.USER,
    useClass:UserService
  }],
  exports:[{
    provide:Services.USER,
    useClass:UserService
  }]
})
export class UserModule {}
