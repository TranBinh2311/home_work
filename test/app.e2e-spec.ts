import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get(
        '/fixtures?startDate=2024-01-01&endDate=2024-01-31&page=1&perPage=10&orderBy=ASC',
      )
      .expect(200)
      .expect({
        data: [
          {
            id: 1,
            dateTime: '2024-01-03T15:00:00.000Z',
            homeTeamScore: 2,
            awayTeamScore: 1,
            status: 'completed',
            tournament: {
              id: 1,
              name: 'Champions League',
              location: 'Europe',
              year: 2024,
            },
            homeTeam: { id: 1, name: 'Manchester United', foundedYear: 1900 },
            awayTeam: { id: 2, name: 'Manchester City', foundedYear: 1900 },
          },
          {
            id: 2,
            dateTime: '2024-01-03T17:00:00.000Z',
            homeTeamScore: 2,
            awayTeamScore: 1,
            status: 'completed',
            tournament: {
              id: 2,
              name: 'World Cup',
              location: 'Qatar',
              year: 2024,
            },
            homeTeam: { id: 3, name: 'Liverpool', foundedYear: 1900 },
            awayTeam: { id: 4, name: 'Asenal', foundedYear: 1900 },
          },
          {
            id: 3,
            dateTime: '2024-01-04T15:00:00.000Z',
            homeTeamScore: 2,
            awayTeamScore: 1,
            status: 'completed',
            tournament: {
              id: 1,
              name: 'Champions League',
              location: 'Europe',
              year: 2024,
            },
            homeTeam: { id: 1, name: 'Manchester United', foundedYear: 1900 },
            awayTeam: { id: 3, name: 'Liverpool', foundedYear: 1900 },
          },
          {
            id: 4,
            dateTime: '2024-01-05T21:00:00.000Z',
            homeTeamScore: 2,
            awayTeamScore: 1,
            status: 'scheduled',
            tournament: {
              id: 3,
              name: 'Euro',
              location: 'Germany',
              year: 2024,
            },
            homeTeam: { id: 2, name: 'Manchester City', foundedYear: 1900 },
            awayTeam: { id: 4, name: 'Asenal', foundedYear: 1900 },
          },
        ],
        count: 4,
        link: {
          self: 'localhost:5000?startDate=2024-01-01&endDate=2024-01-31&orderBy=ASC&perPage=10&page=1',
          next: 'localhost:5000?startDate=2024-01-01&endDate=2024-01-31&orderBy=ASC&perPage=10&page=2',
        },
      });
  });
});
