import { IsNotEmpty } from 'class-validator';

export class GenreCreateDTO {
  @IsNotEmpty()
  name: string;
}
