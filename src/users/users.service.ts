import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserCreationDto } from '../types/user.types';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findAll() : Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async findOneById(userId: string) : Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                id: +userId
            },
        })
    }

    async findOneByEmail(email: string) : Promise<User | null> {
        return this.prisma.user.findUnique({
            where: {
                email: email
            },
        })
    }

    async create(userCreationDto: UserCreationDto) {
        const hashedPassword = await this.hashPassword(userCreationDto.password);

        try {
            await this.prisma.user.create({
                data: {
                    name: userCreationDto.name,
                    email: userCreationDto.email,
                    password: hashedPassword
                }
            });

            return 'utilisateur créé avec succès'
        } catch (error) {
            throw new Error("Impossible de créer l'utilisateur : " + error);
        }
    }

    async update(userId: string, userUpdateDto: UserCreationDto) {
        return this.prisma.user.update({
            where: {
                id: +userId
            },
            data: {
                name: userUpdateDto.name,
                email: userUpdateDto.email,
            }
        });
    }

    async delete(userId: string) {
        return this.prisma.user.delete({
            where: {
                id: +userId
            }
        });
    }

    private async hashPassword(password: string) {
        return hash(password, 9);
    }
}
