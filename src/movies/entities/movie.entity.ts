import { IsNumber, IsOptional, IsString } from 'class-validator';

export class Movie {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsNumber()
  year: number;

  @IsOptional()
  @IsString({ each: true })
  genres?: string[];
}
