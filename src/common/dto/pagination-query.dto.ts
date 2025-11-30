import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @ApiPropertyOptional({ description: 'Page number', default: 1, example: 1 })
  @IsOptional()
  @IsPositive({ message: 'Page must be a positive number' })
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Items per page',
    default: 10,
    example: 10,
  })
  @IsOptional()
  @IsPositive({ message: 'Limit must be a positive number' })
  @Type(() => Number)
  limit?: number = 10;
}
