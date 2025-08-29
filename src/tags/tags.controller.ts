import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import type { TagCreateDto } from './tags.service';
import { Tag } from '@prisma/client';

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
    create(@Body() tagCreateDto: TagCreateDto) {
        return this.tagsService.create(tagCreateDto);
    }
}
