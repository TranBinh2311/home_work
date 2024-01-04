import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Fixture } from './fixture.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  foundedYear: number;

  @OneToMany((type) => Fixture, (fixture) => fixture.homeTeam, {
    cascade: true,
  })
  homeFixtures: Fixture[];

  @OneToMany((type) => Fixture, (fixture) => fixture.awayTeam, {
    cascade: true,
  })
  awayFixtures: Fixture[];
}
