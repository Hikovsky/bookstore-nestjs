import { IsNotEmpty } from 'class-validator';

export class GenreUpdateDto {
  @IsNotEmpty()
  id: number;
  @IsNotEmpty()
  name: string;
}
