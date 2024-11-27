import { Injectable, NotFoundException } from '@nestjs/common';
import { Fabricante } from '../entities/fabricante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateFabricanteDTO,
  UpdateFabricanteDTO,
} from '../dtos/fabricante.dto';

@Injectable()
export class FabricantesService {
  constructor(
    @InjectRepository(Fabricante)
    private fabricantesRepository: Repository<Fabricante>,
  ) {}

  findAll() {
    return this.fabricantesRepository.find({
      relations: ['productos'],
    });
  }

  async findOne(id: number) {
    const fabricante = await this.fabricantesRepository.findOne(id, {
      relations: ['productos'],
    });
    if (!fabricante) {
      throw new NotFoundException(`Fabricante ID: ${id} => no existe`);
    }
    return fabricante;
  }

  create(data: CreateFabricanteDTO) {
    const newFabricante = this.fabricantesRepository.create(data);
    return this.fabricantesRepository.save(newFabricante);
  }

  async update(id: number, changes: UpdateFabricanteDTO) {
    const fabricante = await this.fabricantesRepository.findOne(id);
    this.fabricantesRepository.merge(fabricante, changes);
    return this.fabricantesRepository.save(fabricante);
  }

  remove(id: number) {
    return this.fabricantesRepository.delete(id);
  }
}
