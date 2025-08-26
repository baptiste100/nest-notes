import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Note } from '@prisma/client';

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
}
