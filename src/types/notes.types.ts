export interface NoteCreationDto {
    title: string,
    content: string,
    authorId: number
}

export type NoteUpdateDto = Omit<NoteCreationDto, "authorId">;
