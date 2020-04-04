import { Module, MiddlewareConsumer } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './schemas/blog.schema';
import { AuthMiddleware } from './auth.middleware';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Post', schema: BlogSchema }])
    ],
    controllers: [BlogController],
    providers: [BlogService]
})
export class BlogModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(BlogController);
    }
}
