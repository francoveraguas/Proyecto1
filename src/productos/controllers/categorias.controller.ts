import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriasService } from '../services/categorias.service';
import { CreateCategoriaDTO, UpdateCategoriaDTO } from '../dtos/categoria.dto';

@ApiTags('Categorias')
@Controller('categorias')
export class CategoriasController {
  constructor(private categoriasService: CategoriasService) {}

  @Get()
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriasService.findOne(id);
  }

  @Post()
  create(@Body() nuevaCategoria: CreateCategoriaDTO) {
    return this.categoriasService.create(nuevaCategoria);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() categoria: UpdateCategoriaDTO,
  ) {
    return this.categoriasService.update(id, categoria);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriasService.remove(id);
  }
}
