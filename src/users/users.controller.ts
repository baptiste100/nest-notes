import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import type { UserCreationDto } from '../types/user.types';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    findAll() : Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id : string) : Promise<User | null> {
        return this.usersService.findOne(id);
    }

    @Post()
    create(@Body() userCreationDto: UserCreationDto) {
        return this.usersService.create(userCreationDto);
    }

    @Patch(':id')
    update(@Param('id') id : string, @Body() userUpdateDto: UserCreationDto) {
        return this.usersService.update(id, userUpdateDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.usersService.delete(id);
    }
}
