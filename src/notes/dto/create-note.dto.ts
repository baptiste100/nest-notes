import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNoteDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    content: string;

    @IsNumber()
    authorId: number;
}