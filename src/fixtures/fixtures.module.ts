import { Module } from '@nestjs/common';
import { FixturesController } from './fixtures.controller';
import { FixturesService } from './fixtures.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fixture } from './entities/fixture.entity';
import { Tournament } from './entities/tournament.entity';
import { Team } from './entities/team.entity';
import { PaginationService } from './pagination.service';

@Module({
  imports: [TypeOrmModule.forFeature([Fixture, Tournament, Team])],
  controllers: [FixturesController],
  providers: [FixturesService, PaginationService],
})
export class FixturesModule {}
