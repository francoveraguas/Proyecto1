import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comprador } from '../entities/comprador.entity';
import { CreateCompradorDTO, UpdateCompradorDTO } from '../dtos/comprador.dto';

@Injectable()
export class CompradoresService {
  constructor(
    @InjectRepository(Comprador)
    private compradoresRepository: Repository<Comprador>,
  ) {}

  async findAll() {
    return await this.compradoresRepository.find();
  }

  async findOne(id: number) {
    const comprador = await this.compradoresRepository.findOne(id);
    if (!comprador) {
      throw new NotFoundException(`Comprador ID${id} no encontrado.`);
    }
    return comprador;
  }

  create(data: CreateCompradorDTO) {
    const nuevoComprador = this.compradoresRepository.create(data);
    return this.compradoresRepository.save(nuevoComprador);
  }

  async update(id: number, changes: UpdateCompradorDTO) {
    const comprador = await this.findOne(id);
    if (!comprador) {
      throw new NotFoundException(`Comprador ID ${id} => no existe`);
    }
    this.compradoresRepository.merge(comprador, changes);
    return this.compradoresRepository.save(comprador);
  }

  remove(id: number) {
    return this.compradoresRepository.delete(id);
  }
}
