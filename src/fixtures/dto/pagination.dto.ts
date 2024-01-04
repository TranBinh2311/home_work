// Trong pagination.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class PaginationDTO {
  @ApiProperty({ description: 'Page number', example: 1 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number;

  @ApiProperty({ description: 'Number of items per page', example: 10 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  perPage: number;
}
