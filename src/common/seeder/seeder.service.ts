import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fixture } from 'src/fixtures/entities/fixture.entity';
import { Team } from 'src/fixtures/entities/team.entity';
import { Tournament } from 'src/fixtures/entities/tournament.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    @InjectRepository(Fixture)
    private readonly fixtureRepository: Repository<Fixture>,
  ) {}

  async seed() {
    await this.seedTournaments();
    await this.seedTeams();
    await this.seedFixtures();
  }

  private async seedTournaments() {
    const tournamentCount = await this.tournamentRepository.count();
    if (tournamentCount === 0) {
      const tournaments = [
        { id: 1, name: 'Champions League', location: 'Europe', year: 2024 },
        { id: 2, name: 'World Cup', location: 'Qatar', year: 2024 },
        { id: 3, name: 'Euro', location: 'Germany', year: 2024 },
      ];
      await this.tournamentRepository.save(tournaments);
      console.log('Tournaments seeded');
    }
  }

  private async seedTeams() {
    const teamCount = await this.teamRepository.count();
    if (teamCount === 0) {
      const teams = [
        {
          id: 1,
          name: 'Manchester United',
          foundedYear: 1900,
        },
        {
          id: 2,
          name: 'Manchester City',
          foundedYear: 1900,
        },
        {
          id: 3,
          name: 'Liverpool',
          foundedYear: 1900,
        },
        {
          id: 4,
          name: 'Asenal',
          foundedYear: 1900,
        },
      ];
      await this.teamRepository.save(teams);
      console.log('Teams seeded');
    }
  }

  private async seedFixtures() {
    const fixtureCount = await this.fixtureRepository.count();
    if (fixtureCount === 0) {
      const fixtures = [
        {
          tournament: { id: 1 },
          homeTeam: { id: 1 },
          awayTeam: { id: 2 },
          dateTime: new Date('2024-01-03T15:00:00Z').toISOString(), // Use the new dateTime format
          homeTeamScore: 2,
          awayTeamScore: 1,
          status: 'completed',
        },
        {
          tournament: { id: 2 },
          homeTeam: { id: 3 },
          awayTeam: { id: 4 },
          dateTime: new Date('2024-01-03T17:00:00Z').toISOString(), // Use the new dateTime format
          homeTeamScore: 2,
          awayTeamScore: 1,
          status: 'completed',
        },
        {
          tournament: { id: 1 },
          homeTeam: { id: 1 },
          awayTeam: { id: 3 },
          dateTime: new Date('2024-01-04T15:00:00Z').toISOString(), // Use the new dateTime format
          homeTeamScore: 2,
          awayTeamScore: 1,
          status: 'completed',
        },
        {
          tournament: { id: 3 },
          homeTeam: { id: 2 },
          awayTeam: { id: 4 },
          dateTime: new Date('2024-01-05T21:00:00Z').toISOString(), // Use the new dateTime format
          homeTeamScore: 2,
          awayTeamScore: 1,
          status: 'scheduled',
        },
      ];
      await this.fixtureRepository.save(fixtures);
      console.log('Fixtures seeded');
    }
  }
}
