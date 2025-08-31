import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Tag } from '@prisma/client';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
    constructor(private prisma: PrismaService) {}

    findAll() : Promise<Tag[]> {
        return this.prisma.tag.findMany();
    }

    findOne(tagId: string) : Promise<Tag | null> {
        return this.prisma.tag.findUnique({
            where: {
                id: +tagId
            },
        })
    }

    create(tagCreateDto: CreateTagDto) {
        return this.prisma.tag.create({
            data: {
                name: tagCreateDto.name,
                createdAt: new Date()
            }
        })
    }

    update(tagId: string, tagUpdateDto: CreateTagDto) {
        return this.prisma.tag.update({
            where: {
                id: +tagId
            },
            data: {
                name: tagUpdateDto.name
            }
        });
    }

    delete(tagId: string) {
        return this.prisma.tag.delete({
            where: {
                id: +tagId
            }
        });
    }
}
