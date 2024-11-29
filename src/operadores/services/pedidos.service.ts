import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from '../entities/pedido.entity';
import { Repository } from 'typeorm';
import { Comprador } from '../entities/comprador.entity';
import { CreatePedidoDto, UpdatePedidoDto } from '../dtos/pedido.dto';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido) private pedidosRepository: Repository<Pedido>,
    @InjectRepository(Comprador)
    private compradoresRepository: Repository<Comprador>,
  ) {}

  findAll() {
    return this.pedidosRepository.find({
      relations: ['detalles', 'detalles.producto'],
    });
  }

  async findOne(id: number) {
    const pedido = await this.pedidosRepository.findOne(id, {
      relations: ['detalles', 'detalles.producto'],
    });
    if (!pedido) {
      throw new NotFoundException('El pedido no existe');
    }
    return pedido;
  }

  async create(data: CreatePedidoDto) {
    const pedido = new Pedido();
    if (data.compradorId) {
      const comprador = await this.compradoresRepository.findOne(
        data.compradorId,
      );
      pedido.comprador = comprador;
    }
    return this.pedidosRepository.save(pedido);
  }

  async update(id: number, changes: UpdatePedidoDto) {
    const pedido = await this.findOne(id);
    if (!pedido) {
      throw new NotFoundException('El pedido no existe');
    }
    if (changes.compradorId) {
      const comprador = await this.compradoresRepository.findOne(
        changes.compradorId,
      );
      pedido.comprador = comprador;
    }
    return this.pedidosRepository.save(pedido);
  }

  remove(id: number) {
    return this.pedidosRepository.delete(id);
  }
}
