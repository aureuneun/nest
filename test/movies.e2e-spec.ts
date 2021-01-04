import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateMovieInput } from 'src/movies/dtos/create-movie.dto';
import { UpdateMovieInput } from 'src/movies/dtos/update-movie.dto';

describe('MoviesController', () => {
  let app: INestApplication;
  const createMovieInput: CreateMovieInput = {
    title: 'title',
    year: 2021,
    genres: ['genres'],
  };
  const updateMovieInput: UpdateMovieInput = {
    title: 'updated title',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  describe('/movies', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send(createMovieInput)
        .expect(201);
    });

    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({ ...createMovieInput, other: 'thing' })
        .expect(400);
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });

    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/100').expect(404);
    });

    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send(updateMovieInput)
        .expect(200);
    });

    it('PATCH 404', () => {
      return request(app.getHttpServer())
        .patch('/movies/100')
        .send(updateMovieInput)
        .expect(404);
    });

    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });

    it('DELETE 404', () => {
      return request(app.getHttpServer()).delete('/movies/100').expect(404);
    });
  });
});
