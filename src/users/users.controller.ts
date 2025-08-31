import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Note, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    findAll() : Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get('email/:email')
    findOneByEmail(@Param('email') email: string) : Promise<User | null> {
        return this.usersService.findOneByEmail(email);
    }

    @Get(':id/notes')
    findNotes(@Param('id') id : string) : Promise<Note[]> {
        return this.usersService.findNotes(id);
    }

    @Get(':id')
    findOneById(@Param('id') id : string) : Promise<User | null> {
        return this.usersService.findOneById(id);
    }

    @Post()
    create(@Body() userCreationDto: CreateUserDto) {
        return this.usersService.create(userCreationDto);
    }

    @Patch(':id')
    update(@Param('id') id : string, @Body() userUpdateDto: CreateUserDto) {
        return this.usersService.update(id, userUpdateDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.usersService.delete(id);
    }
}
