import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { Services } from "../utils/constants";
import { AuthService } from "./auth.service";
import { UserModule } from "../users/user.module";
import { LocalStrategy } from "./utils/LocalStrategy";
import { SessionSerializer } from "./utils/SessionSerializer";

@Module({
  imports:[UserModule],
  controllers:[AuthController],
  providers:[
    LocalStrategy,
    SessionSerializer,
    {provide:Services.AUTH,
    useClass:AuthService
    }
  ]
})
export class AuthModule{}