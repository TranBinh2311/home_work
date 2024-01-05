import { Test, TestingModule } from '@nestjs/testing';
import { FixturesController } from './fixtures.controller';
import { FixturesService } from './fixtures.service';
import { FixtureRequestDTO } from './dto/fixture-request.dto';
import { ApiResponse } from './dto/api-response.dto';
import { Fixture } from './entities/fixture.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PaginationService } from './pagination.service';

describe('FixturesController', () => {
  let fixturesController: FixturesController;
  let fixturesService: FixturesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FixturesController],
      providers: [
        FixturesService,
        {
          provide: getRepositoryToken(Fixture),
          useClass: Repository,
        },
        PaginationService,
      ],
    }).compile();

    fixturesController = module.get<FixturesController>(FixturesController);
    fixturesService = module.get<FixturesService>(FixturesService);
  });

  describe('findAll', () => {
    it('should call fixturesService.findAll with the provided paginationQuery', async () => {
      const paginationQuery: FixtureRequestDTO = { page: 1, perPage: 10 };
      const findAllSpy = jest
        .spyOn(fixturesService, 'findAll')
        .mockResolvedValueOnce({} as ApiResponse<Fixture>);

      await fixturesController.findAll(paginationQuery);

      expect(findAllSpy).toHaveBeenCalledWith(paginationQuery);
    });

    it('should return the result from fixturesService.findAll', async () => {
      const paginationQuery: FixtureRequestDTO = { page: 1, perPage: 10 };
      const expectedResult = {} as ApiResponse<Fixture>;
      jest
        .spyOn(fixturesService, 'findAll')
        .mockResolvedValueOnce(expectedResult);

      const result = await fixturesController.findAll(paginationQuery);

      expect(result).toEqual(expectedResult);
    });
  });
});
