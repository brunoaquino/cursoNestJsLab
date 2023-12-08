import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Curso } from './models/curso.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CursosService {
  constructor(
    @InjectRepository(Curso)
    private cursoRepository: Repository<Curso>,
    private configService: ConfigService,
  ) {}

  private readonly logger = new Logger(CursosService.name);

  async findAll(): Promise<Curso[]> {
    this.logger.log(this.configService.get('DB_HOST'));
    return this.cursoRepository.find();
  }

  async findOne(id: number): Promise<Curso> {
    return this.cursoRepository.findOne({ where: { id } });
  }

  async create(user: Partial<Curso>): Promise<Curso> {
    const newuser = this.cursoRepository.create(user);
    return this.cursoRepository.save(newuser);
  }

  async update(id: number, user: Partial<Curso>): Promise<Curso> {
    await this.cursoRepository.update(id, user);
    return this.cursoRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.cursoRepository.delete(id);
  }
}
