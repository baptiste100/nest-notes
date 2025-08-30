export interface UserCreationDto {
    email: string,
    name: string,
    password: string
}

export type UserUpdateDto = UserCreationDto;