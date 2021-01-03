import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateMovieInput } from './dtos/create-movie.dto';
import { UpdateMovieInput } from './dtos/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getMovies(): Movie[] {
    return this.moviesService.getMovies();
  }

  @Get('/:id')
  getMovie(@Param('id') movieId: number): Movie {
    return this.moviesService.getMovie(movieId);
  }

  @Post()
  create(@Body() createMovieInput: CreateMovieInput) {
    return this.moviesService.createMovie(createMovieInput);
  }

  @Delete(':id')
  removeMovie(@Param('id') movieId: number) {
    return this.moviesService.removeMovie(movieId);
  }

  @Patch(':id')
  updateMovie(
    @Param('id') movieId: number,
    @Body() updateMovieInput: UpdateMovieInput,
  ) {
    return this.moviesService.updateMovie(movieId, updateMovieInput);
  }
}
