import { Test, TestingModule } from '@nestjs/testing';
import { FixturesService } from './fixtures.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fixture } from './entities/fixture.entity';
import { FixtureRequestDTO } from './dto/fixture-request.dto';
import { ApiResponse } from './dto/api-response.dto';
import { PaginationService } from './pagination.service';

describe('FixturesService', () => {
  let fixturesService: FixturesService;
  let fixtureRepository: Repository<Fixture>;
  let paginationService: PaginationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FixturesService,
        PaginationService,
        {
          provide: getRepositoryToken(Fixture),
          useClass: Repository,
        },
      ],
    }).compile();

    fixturesService = module.get<FixturesService>(FixturesService);
    fixtureRepository = module.get<Repository<Fixture>>(
      getRepositoryToken(Fixture),
    );
    paginationService = module.get<PaginationService>(PaginationService);
  });

  describe('findAll', () => {
    it('should return ApiResponse<Fixture> with data, count, and link properties', async () => {
      const paginationQuery: FixtureRequestDTO = { page: 1, perPage: 10 };
      const expectedResult: ApiResponse<Fixture> = {
        data: [] as Fixture[],
        count: 2,
        link: {},
      };

      jest.spyOn(fixtureRepository, 'createQueryBuilder').mockReturnValueOnce({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getManyAndCount: jest
          .fn()
          .mockResolvedValueOnce([expectedResult.data, expectedResult.count]),
      } as any);

      jest
        .spyOn(paginationService, 'buildPaginationLinks')
        .mockReturnValueOnce(expectedResult.link);

      const result = await fixturesService.findAll(paginationQuery);

      expect(result).toEqual(expectedResult);
    });
  });
});
