// Trong pagination.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsOptional } from 'class-validator';

export class FilterDateDTO {
  @ApiProperty({
    description: 'Filter by start date and time (YYYY-MM-DD HH:MM:SS)',
    example: '2024-01-01',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value).toISOString() : value))
  startDate?: string;

  @ApiProperty({
    description:
      'Filter by end date and time (YYYY-MM-DD or YYYY-MM-DDTHH:MM:SS")',
    example: '2024-01-31',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value).toISOString() : value))
  endDate?: string;
}
