import { Module } from '@nestjs/common';
import { FabricantesController } from './controllers/fabricantes.controller';
import { CategoriasController } from './controllers/categorias.controller';
import { ProductosController } from './controllers/productos.controller';
import { ProductosService } from './services/productos.service';
import { FabricantesService } from './services/fabricantes.service';
import { CategoriasService } from './services/categorias.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Categoria } from './entities/categoria.entity';
import { Fabricante } from './entities/fabricante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria, Fabricante, Producto])],
  controllers: [
    CategoriasController,
    FabricantesController,
    ProductosController,
  ],
  providers: [CategoriasService, FabricantesService, ProductosService],
  exports: [ProductosService],
})
export class ProductosModule {}
