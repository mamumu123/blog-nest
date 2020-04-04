import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/data/schemas/user.schema';

import { AuthService } from '../auth/auth.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    // 这个地方先导入，里面才可以用
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
    ],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule { }
