import { Injectable, Scope } from '@nestjs/common';
import { logger } from './logger';

@Injectable({ scope: Scope.REQUEST })
export class LoggerProvider {
    private readonly _logger;
    constructor() {
        this._logger = logger.child({ requestId: '451' });
    }

}