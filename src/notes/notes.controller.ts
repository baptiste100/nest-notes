import { Controller, Get, Param } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from '@prisma/client';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Note | null> {
    return this.notesService.findOne(id);
  }
}
