import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductosService } from 'src/productos/services/productos.service';
import { Pedido } from '../entities/pedido.entity';
import { Operador } from '../entities/operador.entity';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateOperadorDTO, UpdateOperadorDTO } from '../dtos/operador.dto';
import { CompradoresService } from './compradores.service';

@Injectable()
export class OperadoresService {
  constructor(
    private productsService: ProductosService,
    private configService: ConfigService,
    @InjectRepository(Operador)
    private operadoresRepository: Repository<Operador>,
    @Inject('PG') private clientPG: Client,
    private compradorService: CompradoresService,
  ) {}

  async create(data: CreateOperadorDTO) {
    const nuevoOperador = this.operadoresRepository.create(data);
    if (data.compradorId) {
      const comprador = await this.compradorService.findOne(data.compradorId);
      nuevoOperador.comprador = comprador;
    }
    return await this.operadoresRepository.save(nuevoOperador);
  }

  async update(id: number, changes: UpdateOperadorDTO) {
    const operador = await this.findOne(id);
    if (!operador) {
      throw new NotFoundException(`Operador ID ${id} => no existe`);
    }
    if (changes.compradorId) {
      const nuevoComprador = await this.compradorService.findOne(
        changes.compradorId,
      );
      operador.comprador = nuevoComprador;
    }
    const actualizarOperador = this.operadoresRepository.merge(
      operador,
      changes,
    );
    return this.operadoresRepository.save(actualizarOperador);
  }

  async remove(id: number) {
    const operador = await this.operadoresRepository.findOne(id);
    if (!operador) {
      throw new NotFoundException(`Operador ID ${id} => no existe`);
    }
    console.log(`Operador Eliminado`);
    return this.operadoresRepository.delete(id);
  }

  async findOne(id: number) {
    const operador = await this.operadoresRepository.findOne(id, {
      relations: ['comprador'],
    });
    if (!operador) {
      throw new NotFoundException(`Operador ID ${id} => no existe`);
    }
    return operador;
  }

  async findAll() {
    const apiKey = this.configService.get('APIKEY');
    const dbName = this.configService.get('DB_NAME');
    console.log(apiKey, dbName);
    return await this.operadoresRepository.find({
      relations: ['comprador'],
    });
  }

  async getOrderByUser(id: number) {
    const operador = await this.operadoresRepository.findOne(id);
    if (!operador) {
      throw new NotFoundException(`Operador ID ${id} => no existe`);
    }
    return {
      id: (await operador).id,
      date: new Date(),
      operador: await operador,
      products: await this.productsService.findAll(),
    };
  }
}
