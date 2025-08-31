import { CreateNoteDto } from './create-note.dto';
import { OmitType } from '@nestjs/mapped-types';

export class UpdateNoteDto extends OmitType(CreateNoteDto, ['authorId'] as const) {}