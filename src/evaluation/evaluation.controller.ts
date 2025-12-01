import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiQuery,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { EvaluationService } from './evaluation.service';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import type { UserInfo } from 'src/common/interfaces/user.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Evaluations')
@Controller('evaluations')
export class EvaluationController {
  constructor(private readonly evaluationService: EvaluationService) {}

  @ApiOperation({ summary: 'Create a new evaluation' })
  @ApiBody({ type: CreateEvaluationDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateEvaluationDto, @CurrentUser() user: UserInfo) {
    return this.evaluationService.create(dto, user);
  }

  @ApiOperation({ summary: 'Get paginated evaluations' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Query() pagination: PaginationQueryDto,
    @CurrentUser() user: UserInfo,
  ) {
    return this.evaluationService.findAll(
      pagination.page,
      pagination.limit,
      user,
    );
  }

  @ApiOperation({ summary: 'Get an evaluation by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: UserInfo) {
    return this.evaluationService.findOne(id, user);
  }

  @ApiOperation({ summary: 'Update an evaluation by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateEvaluationDto })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateEvaluationDto,
    @CurrentUser() user: UserInfo,
  ) {
    return this.evaluationService.update(id, dto, user);
  }

  @ApiOperation({ summary: 'Delete an evaluation by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: UserInfo) {
    return this.evaluationService.remove(id, user);
  }
}
