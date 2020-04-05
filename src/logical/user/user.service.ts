// src/logical/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDTO } from 'src/data/dto/create-user.dto';
import { User } from 'src/data/interfaces/user.interface';

import { encryptPassword, makeSalt } from '../../utils/cryptogram';
import { Post } from 'src/data/interfaces/post.interface';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<Post>) { }

    /**
     * 查询是否有该用户
     * @param username 用户名
     */
    async findOne(username: string): Promise<any | undefined> {
        const post = await this.userModel
            .findOne({ username })
            .exec();
        return post;
    }

    /**
     * 注册
     * @param requestBody 请求体
     */
    async register(requestBody: CreateUserDTO): Promise<any> {
        const { username, password } = requestBody;
        if (!username || !password) {
            return {
                code: 400,
                msg: '不能为空',
            };
        }
        const user = await this.findOne(username);
        if (user) {
            return {
                code: 400,
                msg: '用户已存在',
            };
        }
        const salt = makeSalt(); // 制作密码盐
        const hashPwd = encryptPassword(password, salt);  // 加密密码
        return await this.userModel({ ...requestBody, password: hashPwd, salt }).save()
    }
}
