import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IntersectionType } from '@nestjs/mapped-types';
import { PaginationDTO } from './pagination.dto';
import { FilterDateDTO } from './filter-date.dto';

enum OrderByEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class FixtureRequestDTO extends IntersectionType(
  FilterDateDTO,
  PaginationDTO,
) {
  @ApiProperty({
    description: 'Order by Start Date',
    enum: OrderByEnum,
    default: OrderByEnum.ASC,
    required: false,
  })
  @IsOptional()
  @IsEnum(OrderByEnum)
  orderBy: OrderByEnum = OrderByEnum.ASC;
}
