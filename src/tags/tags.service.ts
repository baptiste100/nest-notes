import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TagsService {
    constructor(private prisma: PrismaService) {}
}
