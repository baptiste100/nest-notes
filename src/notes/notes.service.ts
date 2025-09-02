import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Note, Tag } from '@prisma/client';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<Note[]> {
    return this.prisma.note.findMany();
  }

  findOne(noteId: string): Promise<Note | null> {
    return this.prisma.note.findUnique({
      where: {
        id: +noteId
      }
    });
  }

  findTags(noteId: string) : Promise<Tag[]> {
    return this.prisma.tag.findMany({
      where: {
        notes: {
          some: {
            id: +noteId
          }
        }
      }
    });
  }

  create(createNoteDto: CreateNoteDto, userId: number) {
    return this.prisma.note.create({
      data: {
        title: createNoteDto.title,
        content: createNoteDto.content,
        createdAt: new Date(),
        author: {
          connect: {
            id: userId
          }
        }
      }
    });
  }

  update(noteId: string, updateNoteDto: UpdateNoteDto) {
    return this.prisma.note.update({
      where: {
        id: +noteId
      },
      data: {
        title: updateNoteDto.title,
        content: updateNoteDto.content
      }
    });
  }

  delete(noteId: string) {
    return this.prisma.note.delete({
      where: {
        id: +noteId
      }
    });
  }
}
