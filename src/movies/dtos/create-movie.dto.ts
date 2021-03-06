import { PickType } from '@nestjs/mapped-types';
import { Movie } from '../entities/movie.entity';

export class CreateMovieInput extends PickType(Movie, [
  'title',
  'year',
  'genres',
]) {}
