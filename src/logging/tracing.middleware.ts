import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TracingMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const correlationId = uuidv4();
        req.headers['x-correlation-id'] = correlationId;
        res.setHeader('X-Correlation-ID', correlationId);
        next();
    }
}