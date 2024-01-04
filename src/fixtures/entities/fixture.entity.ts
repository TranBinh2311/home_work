import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Tournament } from './tournament.entity';
import { Team } from './team.entity';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export const SwaggerISODate = () =>
  ApiProperty({ example: new Date().toISOString() });

@Entity()
export class Fixture {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Tournament, (tournament) => tournament.fixtures, {
    onDelete: 'CASCADE',
  })
  tournament: Tournament;

  @ManyToOne((type) => Team, (team) => team.homeFixtures, {
    onDelete: 'CASCADE',
  })
  homeTeam: Team;

  @ManyToOne((type) => Team, (team) => team.awayFixtures, {
    onDelete: 'CASCADE',
  })
  awayTeam: Team;

  @Column({ type: 'timestamp' }) // Adjust the type according to your database's datetime format
  dateTime: Date;

  @Column({ nullable: true })
  homeTeamScore: number;

  @Column({ nullable: true })
  awayTeamScore: number;

  @Column({
    type: 'enum',
    enum: ['scheduled', 'completed', 'postponed'],
    default: 'scheduled',
  })
  status: string;
}
