import { Role } from './rbac/roles';

export interface User {
    roles: Role[];
}
export class JwtProvider {

    async validateToken(token: string): Promise<User> {
        // const payload = await this.jwtService.verifyAsync(
        //     token,
        //     {
        //         secret: jwtConstants.secret
        //     }
        // );
        return {
            roles: [Role.Admin]
        };
    }
}