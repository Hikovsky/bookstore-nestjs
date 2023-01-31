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
import { AuthorService } from './author.service';
import { AuthorCreateDto, AuthorUpdateDto } from './dto';

@Controller('authors')
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  createAuthor(@Body() dto: AuthorCreateDto) {
    return this.authorService.createAuthor(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('list')
  authorsList() {
    return this.authorService.authorsList();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  authorDetail(@Param('id', ParseIntPipe) authorId: number) {
    return this.authorService.authorDetail(authorId);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  updateAuthor(
    @Body() dto: AuthorUpdateDto,
    @Param('id', ParseIntPipe) authorId: number,
  ) {
    return this.authorService.updateAuthor(dto, authorId);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  deleteAuthor(@Param('id', ParseIntPipe) authorId: number) {
    return this.authorService.deleteAuthor(authorId);
  }
}
