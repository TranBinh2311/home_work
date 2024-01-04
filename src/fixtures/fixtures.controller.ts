import { Controller, Get, Query } from '@nestjs/common';
import { FixturesService } from './fixtures.service';
import { FixtureRequestDTO } from './dto/fixture-request.dto';

@Controller('fixtures')
export class FixturesController {
  constructor(private readonly fixturesService: FixturesService) {}

  @Get()
  async findAll(@Query() paginationQuery: FixtureRequestDTO) {
    return this.fixturesService.findAll(paginationQuery);
  }
}
