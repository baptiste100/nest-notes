import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Note, Tag } from '@prisma/client';
import type { NoteCreationDto, NoteUpdateDto } from '../types/notes.types';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

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

  create(createNoteDto: NoteCreationDto) {
    return this.prisma.note.create({
      data: {
        title: createNoteDto.title,
        content: createNoteDto.content,
        createdAt: new Date(),
        author: {
          connect: {
            id: createNoteDto.authorId
          }
        }
      }
    });
  }

  update(noteId: string, updateNoteDto: NoteUpdateDto) {
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
