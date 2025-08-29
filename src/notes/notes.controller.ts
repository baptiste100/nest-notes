import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { NotesService } from './notes.service';
import type { NoteCreationDto, NoteUpdateDto } from './notes.service';
import type { Note, Tag } from '@prisma/client';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Note | null> {
    return this.notesService.findOne(id);
  }

  @Get(':id/tags')
  findTags(@Param('id') id: string) : Promise<Tag[]> {
    return this.notesService.findTags(id);
  }

  @Post()
  create(@Body() createNoteDto: NoteCreationDto) {
    return this.notesService.create(createNoteDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: NoteUpdateDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.notesService.delete(id);
  }
}
