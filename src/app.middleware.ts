import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AppMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        console.log(`receive request ${req.url}`)
        next();
    }
}
