import { IsNotEmpty } from 'class-validator';

export class GenreDeleteDto {
  @IsNotEmpty()
  id: number;
}
