import { IsNotEmpty, IsOptional } from 'class-validator';

export class AuthorCreateDto {
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
  @IsNotEmpty()
  @IsOptional()
  secondName: string;
  @IsNotEmpty()
  shortDescription: string;
  @IsNotEmpty()
  fullDescription: string;
}
