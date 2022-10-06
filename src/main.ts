import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import * as session from "express-session";
import * as passport from "passport";
import { getRepository } from "typeorm";
import { Session } from "./utils/typeorm/entities/Session";
import { TypeormStore } from "connect-typeorm";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sessionRepository = getRepository(Session)
  app.setGlobalPrefix('api')
  app.enableCors({origin:["http://localhost:3000"],credentials:true})
  app.useGlobalPipes(new ValidationPipe())
  const {PORT} = process.env

  app.use(
    session({
      secret: "COOKIE_SECRET",
      resave: false,
      saveUninitialized: false,
      name: 'CHAT_APP_SESSION_ID',
      cookie: {
        maxAge: 20000000,
      },
      store: new TypeormStore().connect(sessionRepository)
    }),
  );

  app.use(passport.initialize())
  app.use(passport.session())
  try {
    await app.listen(PORT,()=>console.log(`started on ${PORT}`))
  }
  catch (error){
    console.log(error)
  }
}
bootstrap();
