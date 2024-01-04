import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fixture } from './entities/fixture.entity';
import { Repository } from 'typeorm';
import { FixtureRequestDTO } from './dto/fixture-request.dto';
import { ApiResponse } from './dto/api-response.dto';
import { PaginationService } from 'src/common/pagination/pagination.service';

@Injectable()
export class FixturesService {
  constructor(
    @InjectRepository(Fixture)
    private readonly fixtureRepository: Repository<Fixture>,
    private readonly pagination: PaginationService,
  ) {}

  async findAll(
    paginationQuery: FixtureRequestDTO,
  ): Promise<ApiResponse<Fixture>> {
    const { page, perPage, ...restQuery } = paginationQuery;
    const startDate = restQuery.startDate;
    const endDate = restQuery.endDate;
    const queryBuilder = this.fixtureRepository.createQueryBuilder('fixture');

    // Add relations
    queryBuilder.leftJoinAndSelect('fixture.tournament', 'tournament');
    queryBuilder.leftJoinAndSelect('fixture.homeTeam', 'homeTeam');
    queryBuilder.leftJoinAndSelect('fixture.awayTeam', 'awayTeam');

    // Apply date and time range filter if both startDate and endDate are provided
    if (startDate && endDate) {
      queryBuilder.andWhere(
        'fixture.dateTime BETWEEN :startDate AND :endDate',
        {
          startDate,
          endDate,
        },
      );
    } else {
      // Apply individual date and time filters if only one is provided
      if (startDate) {
        queryBuilder.andWhere('fixture.dateTime >= :startDate', { startDate });
      }
      if (endDate) {
        queryBuilder.andWhere('fixture.dateTime <= :endDate', { endDate });
      }
    }

    queryBuilder.orderBy('fixture.dateTime', `${restQuery.orderBy}`);

    // Apply pagination
    queryBuilder.skip((page - 1) * perPage);
    queryBuilder.take(perPage);

    const [data, total] = await queryBuilder.getManyAndCount();
    const totalPage = Math.ceil(total / perPage);
    const link = this.pagination.buildPaginationLinks(
      process.env.DOMAIN_URL,
      restQuery,
      page,
      perPage,
      totalPage,
    );

    return {
      data,
      count: total,
      link,
    };
  }
}
