import { Body, Controller, Get } from '@nestjs/common';
import type { AuthBodyDto } from '../types/auth.types';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('login')
    login(@Body() authBodyDto: AuthBodyDto) {
        return this.authService.login(authBodyDto);
    }
}
