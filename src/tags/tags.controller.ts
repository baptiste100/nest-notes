import { Controller, Get, Param } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from '@prisma/client';

@Controller('tags')
export class TagsController {
    constructor(private tagsService: TagsService) {}

    @Get(':id')
    findOne(@Param('id') id : string) : Promise<Tag | null> {
        return this.tagsService.findOne(id);
    }
}
