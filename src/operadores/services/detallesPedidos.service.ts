import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from '../entities/pedido.entity';
import { Repository } from 'typeorm';
import { DetallePedido } from '../entities/detallepedido.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { CreateDetallesPedidosDto } from '../dtos/detallespedidos.dto';

@Injectable()
export class DetallesPedidosService {
  constructor(
    @InjectRepository(Pedido) private pedidosRepository: Repository<Pedido>,
    @InjectRepository(DetallePedido)
    private detallesPedidosRepository: Repository<DetallePedido>,
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
  ) {}

  async create(data: CreateDetallesPedidosDto) {
    const pedidoId = await this.pedidosRepository.findOne(data.pedidoId);
    const productoId = await this.productoRepository.findOne(data.productoId);
    const detalles = new DetallePedido();
    detalles.pedido = pedidoId;
    detalles.producto = productoId;
    detalles.cantidad = data.cantidad;
    return this.detallesPedidosRepository.save(detalles);
  }
}
