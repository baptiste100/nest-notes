import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserCreationDto } from '../types/user.types';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    findAll() : Promise<User[]> {
        return this.prisma.user.findMany();
    }

    findOne(userId: string) : Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                id: +userId
            },
        })
    }

    create(userCreationDto: UserCreationDto) {
        return this.prisma.user.create({
            data: {
                name: userCreationDto.name,
                email: userCreationDto.email
            }
        })
    }

    update(userId: string, userUpdateDto: UserCreationDto) {
        return this.prisma.user.update({
            where: {
                id: +userId
            },
            data: {
                name: userUpdateDto.name,
                email: userUpdateDto.email
            }
        });
    }

    delete(userId: string) {
        return this.prisma.user.delete({
            where: {
                id: +userId
            }
        });
    }
}
