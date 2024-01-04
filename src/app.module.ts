import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { FixturesModule } from './fixtures/fixtures.module';
import { SeederModule } from './common/seeder/seeder.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    FixturesModule,
    SeederModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
