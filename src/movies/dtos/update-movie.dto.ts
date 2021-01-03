import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieInput } from './create-movie.dto';

export class UpdateMovieInput extends PartialType(CreateMovieInput) {}
