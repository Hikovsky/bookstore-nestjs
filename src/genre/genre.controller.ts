import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { GenreCreateDTO, GenreUpdateDto } from './dto';
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
  @Get('list')
  getAllGenres() {
    return this.genreService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateGenre(
    @Body() dto: GenreUpdateDto,
    @Param('id', ParseIntPipe) genreId: number,
  ) {
    return this.genreService.update(dto, genreId);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteGenre(@Param('id', ParseIntPipe) genreId: number) {
    return this.genreService.delete(genreId);
  }
}
