import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './rbac/roles.guard';
import { JwtProvider } from './jwt.provider';

@Module({
    providers: [
        AuthGuard,
        RolesGuard,
        JwtProvider,
        {
            provide: APP_GUARD,
            useExisting: AuthGuard,
        },
        {
            provide: APP_GUARD,
            useExisting: RolesGuard,
        },
    ],
})
export class AuthModule { }
