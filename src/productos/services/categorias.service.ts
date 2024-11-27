import { Injectable, NotFoundException } from '@nestjs/common';
import { Categoria } from '../entities/categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoriaDTO, UpdateCategoriaDTO } from '../dtos/categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private categoriasRepository: Repository<Categoria>,
  ) {}

  async findAll() {
    return await this.categoriasRepository.find();
  }

  async findOne(id: number) {
    const categoria = await this.categoriasRepository.findOne(id);
    if (!categoria) {
      throw new NotFoundException(`Categoria ID${id} no encontrado.`);
    }
    return categoria;
  }

  create(data: CreateCategoriaDTO) {
    const nuevaCategoria = this.categoriasRepository.create(data);
    return this.categoriasRepository.save(nuevaCategoria);
  }

  async update(id: number, changes: UpdateCategoriaDTO) {
    const categoria = await this.findOne(id);
    if (!categoria) {
      throw new NotFoundException(`Categoria ID ${id} => no existe`);
    }
    this.categoriasRepository.merge(categoria, changes);
    return this.categoriasRepository.save(categoria);
  }

  remove(id: number) {
    return this.categoriasRepository.delete(id);
  }
}
