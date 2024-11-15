import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateProductDTO,
  UpdateProductDTO,
} from 'src/productos/dtos/producto.dto';
import { Producto } from 'src/productos/entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
  ) {}

  findAll() {
    return this.productosRepository.find();
  }

  findOne(id: number) {
    const producto = this.productosRepository.findOne({ id });
    if (!producto) {
      throw new NotFoundException(`Producto ID: ${id} => No existe`);
    }
    return producto;
  }

  create(data: CreateProductDTO) {
    const newProducto = this.productosRepository.create(data);
    return this.productosRepository.save(newProducto);
  }

  async update(id: number, changes: UpdateProductDTO) {
    const producto = await this.productosRepository.findOne({ id });
    this.productosRepository.merge(producto, changes);
    return this.productosRepository.save(producto);
  }

  remove(id: number) {
    return this.productosRepository.delete(id);
  }
}
