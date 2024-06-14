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
  // private idCont = 1;
  // private productos: Producto[] = [
  //   {
  //     id: 1,
  //     nombre: 'Producto A',
  //     descripcion: 'Descripcion Producto A',
  //     precio: 6500,
  //     stock: 1,
  //     origen: 'China',
  //     imagen: '',
  //   },
  // ];

  constructor(
    @InjectRepository(Producto)
    private productosRepository: Repository<Producto>,
  ) {}

  // findAll() {
  //   return this.productosRepository.find;
  // }

  findAll(): Promise<Producto[]> {
    return this.productosRepository.find();
  }

  findOne(id: number) {
    const product = this.productosRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Producto ID: ${id} => No existe`);
    }
    return product;
  }
  // findOne(id: number) {
  //   const product = this.productos.find((item) => item.id === id);
  //   if (!product) {
  //     throw new NotFoundException(`El producto con id: #${id} no existe`);
  //   }
  //   return product;
  // }

  // async create(producto: CreateProductDTO): Promise<Producto> {
  //   const newProducto = this.productosRepository.create(producto);
  //   return this.productosRepository.save(newProducto);
  // }
  create(data: CreateProductDTO) {
    // const newProducto = new Producto();
    // newProducto.nombre = data.nombre;
    // newProducto.descripcion = data.descripcion;
    // newProducto.precio = data.precio;
    // newProducto.stock = data.stock;
    // newProducto.origen = data.origen;
    // newProducto.imagen = data.imagen;
    const newProducto = this.productosRepository.create(data);
    return this.productosRepository.save(newProducto);
  }
  // create(payload: CreateProductDTO) {
  //   this.idCont = this.idCont + 1;
  //   const newProduct = {
  //     id: this.idCont,
  //     ...payload,
  //   };
  //   this.productos.push(newProduct);
  //   return newProduct;
  // }

  async update(id: number, changes: UpdateProductDTO) {
    const product = await this.productosRepository.findOneBy({ id });
    this.productosRepository.merge(product, changes);
    return this.productosRepository.save(product);
  }
  // update(id: number, payload: UpdateProductDTO) {
  //   const producto = this.findOne(id);
  //   if (producto) {
  //     const index = this.productos.findIndex((item) => item.id === id);
  //     this.productos[index] = {
  //       ...producto,
  //       ...payload,
  //     };
  //     return this.productos[index];
  //   }
  // }

  remove(id: number) {
    return this.productosRepository.delete(id);
  }
  // remove(id: number) {
  //   const index = this.productos.findIndex((item) => item.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException(`El producto #${id} no se encuentra`);
  //   }
  //   this.productos.splice(index, 1);
  //   return true;
  // }
}
