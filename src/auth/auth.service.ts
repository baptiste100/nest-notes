import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { User } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
      private usersService: UsersService,
      private jwtService: JwtService
    ) {}

    async login(authBodyDto: LoginDto) : Promise<{ access_token: string }> {
        const { email, password } = authBodyDto;

        const user: User | null = await this.usersService.findOneByEmail(email);

        if (!user || !(await this.isPasswordValid(password, user.password))) {
            throw new NotFoundException({ error: "Mot de passe ou nom d'utilisateur incorrect"});
        }

        const payload = { sub: user.id, username: user.email }

        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }

    private async isPasswordValid(password: string, hashedPassword: string): Promise<boolean> {
        return compare(password, hashedPassword);
    }
}
