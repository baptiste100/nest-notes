import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthBodyDto } from '../types/auth.types';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async login(authBodyDto: AuthBodyDto) {
        const { email, password } = authBodyDto;

        const user: User | null = await this.usersService.findOneByEmail(email);

        if (!user || !(await this.isPasswordValid(password, user.password))) {
            throw new NotFoundException({ error: "Mot de passe ou nom d'utilisateur incorrect"});
        }

        return "connected with success";
    }

    private async isPasswordValid(password: string, hashedPassword: string): Promise<boolean> {
        return compare(password, hashedPassword);
    }
}
