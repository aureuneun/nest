import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let moviesService: MoviesService;
  const createMovieInput = {
    title: 'title',
    year: 2021,
    genres: ['genres'],
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    moviesService = module.get<MoviesService>(MoviesService);

    moviesService.createMovie(createMovieInput);
  });

  it('should be defined', () => {
    expect(moviesService).toBeDefined();
  });

  describe('getMovies', () => {
    it('should return an array', () => {
      const results = moviesService.getMovies();

      expect(results).toBeInstanceOf(Array);
    });
  });

  describe('getMovie', () => {
    it('should return a movie', () => {
      const movie = moviesService.getMovie(1);

      expect(movie).toBeDefined();
    });

    it('should throw a NotFoundException', () => {
      try {
        moviesService.getMovie(100);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Could not find movie');
      }
    });
  });

  describe('removeMovie', () => {
    it('should delete a movie', () => {
      const beforeMovies = moviesService.getMovies();
      moviesService.removeMovie(1);
      const afterMovies = moviesService.getMovies();
      expect(afterMovies.length).toBeLessThan(beforeMovies.length);
    });

    it('should throw a NotFoundException', () => {
      try {
        moviesService.removeMovie(100);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Could not find movie');
      }
    });
  });

  describe('createMovie', () => {
    it('should create a movie', () => {
      moviesService.createMovie(createMovieInput);
      const movies = moviesService.getMovies();
      expect(movies.length).toBe(2);
    });
  });

  describe('updateMovie', () => {
    it('should update a movie', () => {
      moviesService.updateMovie(1, { title: 'updated title' });
      const movie = moviesService.getMovie(1);

      expect(movie.title).toBe('updated title');
    });

    it('should throw a NotFoundException', () => {
      try {
        moviesService.updateMovie(100, {});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Could not find movie');
      }
    });
  });
});
