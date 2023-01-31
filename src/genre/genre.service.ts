import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GenreCreateDTO, GenreUpdateDto } from './dto';
import { Genre } from '@prisma/client';

@Injectable()
export class GenreService {
  constructor(private prisma: PrismaService) {}

  async create(dto: GenreCreateDTO) {
    const genreExist: Genre = await this.prisma.genre.findUnique({
      where: { name: dto.name },
    });

    if (genreExist) {
      throw new HttpException('Genre already exist', HttpStatus.CONFLICT);
    }

    const genre: Genre = await this.prisma.genre.create({
      data: {
        name: dto.name,
      },
    });

    return { genre };
  }

  async update(dto: GenreUpdateDto, id) {
    const genreExist: Genre = await this.prisma.genre.findUnique({
      where: { id: id },
    });

    if (!genreExist) {
      throw new HttpException('Genre does not exist', HttpStatus.NOT_FOUND);
    }

    const genre: Genre = await this.prisma.genre.update({
      where: { id: id },
      data: { name: dto.name },
    });

    return { genre };
  }

  async delete(id) {
    const genreExist: Genre = await this.prisma.genre.findUnique({
      where: { id: id },
    });

    if (!genreExist) {
      throw new HttpException('Genre does not exist', HttpStatus.NOT_FOUND);
    }

    const genre: Genre = await this.prisma.genre.delete({
      where: { id: id },
    });

    return { genre };
  }

  async getAll() {
    const genres: Genre[] = await this.prisma.genre.findMany({});
    return { genres };
  }
}
