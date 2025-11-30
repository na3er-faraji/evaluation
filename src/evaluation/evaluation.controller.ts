import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@ApiTags('Evaluations')
@Controller('evaluations')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @ApiOperation({ summary: 'Create a new evaluation' })
  @ApiBody({ type: CreateEvaluationDto })
  @Post()
  create(@Body() dto: CreateEvaluationDto) {
    return this.evaluationService.create(dto);
  }

  @ApiOperation({ summary: 'Get paginated evaluations' })
  @Get()
  findAll(@Query() pagination: PaginationQueryDto) {
    return this.evaluationService.findAll(pagination.page, pagination.limit);
  }

  @ApiOperation({ summary: 'Get an evaluation by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evaluationService.findOne(id);
  }

  @ApiOperation({ summary: 'Update an evaluation by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateEvaluationDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEvaluationDto) {
    return this.evaluationService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete an evaluation by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evaluationService.remove(id);
  }
}
