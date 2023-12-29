import {
    CanActivate,
    ExecutionContext,
    Injectable,
} from '@nestjs/common';

@Injectable()
export class AuthGuardFake implements CanActivate {
    constructor() { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log('Fake auth guard was called')
        return true;
    }

}