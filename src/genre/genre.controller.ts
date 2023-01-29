import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { GenreCreateDTO, GenreDeleteDto, GenreUpdateDto } from './dto';
import { GenreService } from './genre.service';

@Controller('genre')
export class GenreController {
  constructor(private genreService: GenreService) {}
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  createGenre(@Body() dto: GenreCreateDTO) {
    return this.genreService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('update')
  updateGenre(@Body() dto: GenreUpdateDto) {
    return this.genreService.update(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('delete')
  deleteGenre(@Body() dto: GenreDeleteDto) {
    return this.genreService.delete(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('list')
  getAllGenres() {
    return this.genreService.getAll();
  }
}
