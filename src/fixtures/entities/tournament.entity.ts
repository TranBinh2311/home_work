import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Fixture } from './fixture.entity';

@Entity()
export class Tournament {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  year: number;

  @OneToMany((type) => Fixture, (fixture) => fixture.tournament, {
    cascade: true,
  })
  fixtures: Fixture[];
}
