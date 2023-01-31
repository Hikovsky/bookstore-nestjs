import { IsNotEmpty } from 'class-validator';

export class GenreUpdateDto {
  @IsNotEmpty()
  name: string;
}
