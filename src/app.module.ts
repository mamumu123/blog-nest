import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './logical/auth/auth.module';
import { UserModule } from './logical/user/user.module';
import { UserController } from './logical/user/user.controller';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/site', { useNewUrlParser: true }),
        BlogModule,
        AuthModule,
        UserModule
    ],
    controllers: [AppController, UserController],
    providers: [AppService],
})
export class AppModule { }
