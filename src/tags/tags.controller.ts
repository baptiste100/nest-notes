import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from '@prisma/client';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('tags')
export class TagsController {
    constructor(private tagsService: TagsService) {}

    @Get()
    findAll() : Promise<Tag[]> {
        return this.tagsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id : string) : Promise<Tag | null> {
        return this.tagsService.findOne(id);
    }

    @Post()
    create(@Body() tagCreateDto: CreateTagDto) {
        return this.tagsService.create(tagCreateDto);
    }

    @Patch(':id')
    update(@Param('id') id : string, @Body() tagUpdateDto: CreateTagDto) {
        return this.tagsService.update(id, tagUpdateDto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.tagsService.delete(id);
    }
}
