import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEvaluationDto {
  @ApiProperty({
    example: 'Evaluation Title',
    description: 'Title of the evaluation',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Evaluation Description',
    description: 'Description',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
