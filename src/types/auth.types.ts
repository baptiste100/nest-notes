import { User } from '@prisma/client';

export type AuthBodyDto = Pick<User, "email" | "password">