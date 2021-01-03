import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieInput } from './dtos/create-movie.dto';
import { UpdateMovieInput } from './dtos/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getMovies(): Movie[] {
    return this.movies;
  }

  getMovie(movieId: number): Movie {
    const movie = this.movies.find((movie) => movie.id === movieId);
    if (!movie) {
      throw new NotFoundException('Could not find movie');
    }
    return movie;
  }

  createMovie(createMovieInput: CreateMovieInput) {
    this.movies.push({ id: this.movies.length + 1, ...createMovieInput });
  }

  removeMovie(movieId: number) {
    this.getMovie(movieId);
    this.movies = this.movies.filter((movie) => movie.id !== movieId);
  }

  updateMovie(movieId: number, updateMovieInput: UpdateMovieInput) {
    const movie = this.getMovie(movieId);
    this.removeMovie(movieId);
    this.movies.push({ ...movie, ...updateMovieInput });
  }
}
