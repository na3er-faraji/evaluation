import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluation } from './entities/evaluation.entity';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';

@Injectable()
export class EvaluationService {
  constructor(
    @InjectRepository(Evaluation)
    private readonly evaluationRepository: Repository<Evaluation>,
  ) {}

  async create(dto: CreateEvaluationDto) {
    const evaluation = this.evaluationRepository.create(dto);
    return this.evaluationRepository.save(evaluation);
  }

  async findAll(page = 1, limit = 10) {
    const [items, total] = await this.evaluationRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { items, total, page, limit };
  }

  async findOne(id: string) {
    const evaluation = await this.evaluationRepository.findOne({
      where: { id },
    });
    if (!evaluation) throw new NotFoundException(`Evaluation ${id} not found`);
    return evaluation;
  }

  async update(id: string, dto: UpdateEvaluationDto) {
    const evaluation = await this.findOne(id);
    Object.assign(evaluation, dto);
    return this.evaluationRepository.save(evaluation);
  }

  async remove(id: string) {
    const evaluation = await this.findOne(id);
    return this.evaluationRepository.remove(evaluation);
  }
}
