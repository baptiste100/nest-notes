import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from './constants';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';
import { Reflector } from '@nestjs/core';

interface JwtPayload {
    sub: number;
    email: string;
    iat: number;
    exp: number;
}

export interface RequestWithUser extends Request {
    user?: JwtPayload;
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
          context.getHandler(),
          context.getClass()
        ])

        if (isPublic) return true;

        const request= context.switchToHttp().getRequest<RequestWithUser>();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            request['user'] = await this.jwtService.verifyAsync<JwtPayload>(token, { secret: jwtConstants.secret });
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }

    private extractTokenFromHeader(request: RequestWithUser) : string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined
    }
}