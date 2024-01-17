import { Injectable, Scope, ConsoleLogger, Inject } from '@nestjs/common';
import { logger } from './logger';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import winston from 'winston';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ scope: Scope.REQUEST })
export class LoggerProvider extends ConsoleLogger {
    private readonly _logger: winston.Logger;

    constructor(@Inject(REQUEST) private request?: Request) {

        super();
        let correlationId = this.getOrGenerateCorrelationId(request);

        this._logger = logger.child({ correlationId });
    }

    private getOrGenerateCorrelationId(request) {
        let correlationId = '';
        if (request) {
            correlationId = request.headers['x-correlation-id'] as string;
        } else {

            correlationId = uuidv4();
        }
        return correlationId;
    }

    debug(message: any, context?: string) {
        this._logger.debug(message, context);
    }

    info(message: any, context?: string) {
        this._logger.info(message, context);
    }

    warn(message: any, context?: string) {
        this._logger.warn(message, context);
    }

    error(message: any, trace?: string, context?: string) {
        this._logger.error(message, trace, context);
    }
}