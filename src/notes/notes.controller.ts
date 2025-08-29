import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NotesService } from './notes.service';
import type { NoteCreationDto } from './notes.service';
import type { Note } from '@prisma/client';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Note | null> {
    return this.notesService.findOne(id);
  }

  @Post()
  create(@Body() createNoteDto: NoteCreationDto) {
    return this.notesService.create(createNoteDto);
  }
}
