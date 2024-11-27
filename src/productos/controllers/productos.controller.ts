import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import {
  CreateProductDTO,
  UpdateProductDTO,
} from 'src/productos/dtos/producto.dto';
import { ProductosService } from 'src/productos/services/productos.service';
import { Producto } from '../entities/producto.entity';

@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
  constructor(private productosService: ProductosService) {}

  @ApiOperation({ summary: 'Obtener lista de productos.' })
  @Get()
  findAll(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand = '',
  ) {
    return this.productosService.findAll();
  }

  @ApiOperation({ summary: 'Obtener producto especifico.' })
  @Get(':id')
  findone(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.findOne(id);
  }

  @ApiOperation({ summary: 'Crear un producto.' })
  @Post()
  create(@Body() producto: CreateProductDTO): Promise<Producto> {
    return this.productosService.create(producto);
  }

  @ApiOperation({ summary: 'Actualizar un producto.' })
  @Put(':idProduct')
  update(
    @Param('idProduct') idProduct: string,
    @Body() payload: UpdateProductDTO,
  ) {
    return this.productosService.update(+idProduct, payload);
  }

  @ApiOperation({ summary: 'Borrar un producto.' })
  @Delete(':idProduct')
  remove(@Param('idProduct', ParseIntPipe) idProduct: number) {
    return this.productosService.remove(idProduct);
  }

  @ApiOperation({ summary: 'Añadir una categoría a un producto.' })
  @Put(':id/categorias/:categoriaId')
  addCategoryToProduct(
    @Param('id') id: number,
    @Param('categoriaId', ParseIntPipe) categoriaId: number,
  ) {
    return this.productosService.addCategoryToProduct(id, categoriaId);
  }

  @ApiOperation({ summary: 'Eliminar una categoría de un producto.' })
  @Delete(':id/categorias/:categoriaId')
  removeCategoryToProduct(
    @Param('id') id: number,
    @Param('categoriaId', ParseIntPipe) categoriaId: number,
  ) {
    return this.productosService.removeCategoryToProduct(id, categoriaId);
  }
}
