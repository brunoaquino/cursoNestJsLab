import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { CursosService } from './cursos.service';
import { Curso } from './models/curso.entity';
//import { AuthGuard } from '../middleware/auth.guard';

@Controller('cursos')
//@UseGuards(AuthGuard)
export class CursosController {
  constructor(private readonly cursoService: CursosService) {}

  @Get()
  async findAll(): Promise<Curso[]> {
    return this.cursoService.findAll();
  }

  @Post()
  @HttpCode(201)
  async create(@Body() Curso: Curso): Promise<Curso> {
    const createdCurso = await this.cursoService.create(Curso);
    return createdCurso;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() Curso: Curso): Promise<any> {
    await this.cursoService.update(id, Curso);
    return { message: 'Curso updated successfully' };
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    const Curso = await this.cursoService.findOne(id);

    if (!Curso) {
      throw new NotFoundException('Curso does not exist!');
    }

    await this.cursoService.delete(id);
    return { message: 'Curso deleted successfully' };
  }
}
