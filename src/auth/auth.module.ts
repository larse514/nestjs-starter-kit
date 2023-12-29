import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
    providers: [
        AuthGuard,
        {
            provide: APP_GUARD,
            useExisting: AuthGuard,
        },
    ],
})
export class AuthModule { }
