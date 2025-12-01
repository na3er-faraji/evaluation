import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Evaluation } from './entities/evaluation.entity';
import { CreateEvaluationDto } from './dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';
import { UserRole } from 'src/common/enums/user-role.enum';
import { UserInfo } from 'src/common/interfaces/user.interface';

@Injectable()
export class EvaluationService {
  constructor(
    @InjectRepository(Evaluation)
    private readonly evaluationRepository: Repository<Evaluation>,
  ) {}

  async create(dto: CreateEvaluationDto, user: UserInfo) {
    const evaluation = this.evaluationRepository.create({
      ...dto,
      userId: user.id,
    });

    return this.evaluationRepository.save(evaluation);
  }

  async findAll(page = 1, limit = 10, user: UserInfo) {
    const where = user.role === UserRole.ADMIN ? {} : { userId: user.id };

    const [items, total] = await this.evaluationRepository.findAndCount({
      where,
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return { items, total, page, limit };
  }

  async findOne(id: string, user: UserInfo) {
    const evaluation = await this.evaluationRepository.findOne({
      where: { id },
    });

    if (!evaluation) {
      throw new NotFoundException(`Evaluation ${id} not found`);
    }

    if (user.role !== UserRole.ADMIN && evaluation.userId !== user.id) {
      throw new ForbiddenException('Access denied');
    }

    return evaluation;
  }

  async update(id: string, dto: UpdateEvaluationDto, user: UserInfo) {
    const evaluation = await this.findOne(id, user);
    Object.assign(evaluation, dto);
    return this.evaluationRepository.save(evaluation);
  }

  async remove(id: string, user: UserInfo) {
    const evaluation = await this.findOne(id, user);
    return this.evaluationRepository.remove(evaluation);
  }
}
