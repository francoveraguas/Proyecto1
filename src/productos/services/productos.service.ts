import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateProductDTO,
  FiltroProductosDTO,
  UpdateProductDTO,
} from 'src/productos/dtos/producto.dto';
import { Producto } from 'src/productos/entities/producto.entity';
import { Between, FindConditions, Repository } from 'typeorm';
import { FabricantesService } from './fabricantes.service';
import { CategoriasService } from './categorias.service';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
    private fabricantesService: FabricantesService,
    private categoriasService: CategoriasService,
  ) {}

  findAll(params?: FiltroProductosDTO) {
    if (params) {
      const where: FindConditions<Producto> = {};
      const { limit, offset, orden } = params;
      const { precioMinimo, precioMaximo } = params;
      let list;
      if (precioMinimo && precioMaximo) {
        where.precio = Between(precioMinimo, precioMaximo);
      }
      if (orden === 'DESC') {
        list = { id: 'DESC' };
      } else {
        list = { id: 'ASC' };
      }
      return this.productosRepository.find({
        relations: ['fabricante'],
        where,
        take: limit,
        skip: offset,
        order: list,
      });
    }
    return this.productosRepository.find({
      relations: ['fabricante'],
    });
  }

  // findAll() {
  //   return this.productosRepository.find({
  //     relations: ['fabricante'],
  //   });
  // }

  findOne(id: number) {
    const producto = this.productosRepository.findOne(id, {
      relations: ['fabricante', 'categorias'],
    });
    if (!producto) {
      throw new NotFoundException(`Producto ID: ${id} => No existe`);
    }
    return producto;
  }

  async create(data: CreateProductDTO) {
    const newProducto = this.productosRepository.create(data);
    if (data.fabricanteId) {
      const fabricante = await this.fabricantesService.findOne(
        data.fabricanteId,
      );
      newProducto.fabricante = fabricante;
    }
    if (data.categoriasIds) {
      const categorias = await this.categoriasService.findAll();
      newProducto.categorias = categorias;
    }
    return this.productosRepository.save(newProducto);
  }

  async update(id: number, changes: UpdateProductDTO) {
    const producto = await this.productosRepository.findOne(id);
    if (changes.fabricanteId) {
      const fabricante = await this.fabricantesService.findOne(
        changes.fabricanteId,
      );
      producto.fabricante = fabricante;
    }
    if (changes.categoriasIds) {
      const categorias = await this.categoriasService.findAll();
      producto.categorias = categorias;
    }
    this.productosRepository.merge(producto, changes);
    return this.productosRepository.save(producto);
  }

  remove(id: number) {
    return this.productosRepository.delete(id);
  }

  async addCategoryToProduct(productoId: number, categoriaId: number) {
    const producto = await this.productosRepository.findOne({
      where: { id: productoId },
      relations: ['categorias'],
    });
    if (!producto) {
      throw new NotFoundException('Producto no Existe');
    }
    const categoria = await this.categoriasService.findOne(categoriaId);
    producto.categorias.push(categoria);
    return this.productosRepository.save(producto);
  }

  async removeCategoryToProduct(productId: number, categoriaId: number) {
    const producto = await this.productosRepository.findOne({
      where: { id: productId },
      relations: ['categorias'],
    });
    if (!producto) {
      throw new NotFoundException('Producto no Existe');
    }
    const categoria = await this.categoriasService.findOne(categoriaId);
    if (!categoria) {
      throw new NotFoundException('Categoria no existe');
    }
    producto.categorias = producto.categorias.filter(
      (item) => item.id !== categoria.id,
    );
    return this.productosRepository.save(producto);
  }
}
