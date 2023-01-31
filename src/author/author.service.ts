import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthorCreateDto, AuthorUpdateDto } from './dto';
import { Author } from '@prisma/client';

@Injectable()
export class AuthorService {
  constructor(private prisma: PrismaService) {}

  async createAuthor(dto: AuthorCreateDto) {
    const authorExist: Author = await this.prisma.author.findFirst({
      where: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        secondName: dto.secondName,
      },
    });

    if (authorExist) {
      throw new HttpException('Author already exist', HttpStatus.CONFLICT);
    }

    const author: Author = await this.prisma.author.create({
      data: {
        ...dto,
      },
    });

    return { author };
  }

  async authorDetail(id: number) {
    const author: Author = await this.prisma.author.findUnique({
      where: { id: id },
    });

    if (!author) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return { author };
  }

  async authorsList() {
    const authors: Author[] = await this.prisma.author.findMany({});
    return authors;
  }

  async updateAuthor(dto: AuthorUpdateDto, id: number) {
    const authorExist: Author = await this.prisma.author.findUnique({
      where: { id: id },
    });

    if (!authorExist) {
      throw new HttpException('Author does not exist', HttpStatus.NOT_FOUND);
    }

    const author: Author = await this.prisma.author.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });

    return { author };
  }

  deleteAuthor(id: number) {
    return this.prisma.author.delete({
      where: { id: id },
    });
  }
}
