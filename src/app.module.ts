import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from './users/user.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { entities } from "./utils/typeorm";
import { PassportModule } from "@nestjs/passport";
import { ConversationsModule } from "./conversations/conversations.module";
import { MessageModule } from "./messages/message.module";

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({ envFilePath: 'config/.env.development' }),
    PassportModule.register({session:true}),
    TypeOrmModule.forRoot({
      type:'mysql',
      host:process.env.MYSQL_DB_HOST,
      port:parseInt(process.env.MYSQL_DB_PORT),
      username:process.env.MYSQL_DB_USERNAME,
      password:process.env.MYSQL_DB_PASSWORD,
      database:process.env.MYSQL_DB_NAME,
      synchronize:true,
      entities
    }),
    ConversationsModule,
    MessageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
