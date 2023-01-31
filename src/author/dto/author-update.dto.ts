import { IsOptional } from 'class-validator';

export class AuthorUpdateDto {
  @IsOptional()
  firstName: string;
  @IsOptional()
  lastName: string;
  @IsOptional()
  secondName: string;
  @IsOptional()
  shortDescription: string;
  @IsOptional()
  fullDescription: string;
}
