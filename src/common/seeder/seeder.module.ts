import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fixture } from '../../fixtures/entities/fixture.entity';
import { Tournament } from '../../fixtures/entities/tournament.entity';
import { Team } from '../../fixtures/entities/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fixture, Tournament, Team])],
  providers: [SeederService],
})
export class SeederModule {}
