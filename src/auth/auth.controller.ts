import { Body, Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('login')
    login(@Body() authBodyDto: LoginDto) : Promise<{ access_token: string }> {
        return this.authService.login(authBodyDto);
    }
}
