import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Note } from '@prisma/client';

export interface NoteCreationDto {
  title: string,
  content: string,
  authorId: number
}

export type NoteUpdateDto = Omit<NoteCreationDto, "authorId">;

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
    })
  }
}
