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
  // @Post()
  // create(@Body() payload: CreateProductDTO) {
  //   return this.productosService.create(payload);
  // }

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

  // @Get(':idProducto')
  // getProducto(@Param('idProducto') idProducto: string): string {
  //   return `El identificador del producto es: ${idProducto}`;
  // }

  // @Get(':nombre/productos/:calibreProducto')
  // getCategory(
  //   @Param('nombre') nombre: string,
  //   @Param('calibreProducto') calibreProducto: string,
  // ) {
  //   return `El rifle ${nombre} es Calibre: ${calibreProducto}mm.`;
  // }

  // @Post()
  // create(@Body() payload: any) {
  //   return {
  //     message: 'Creado nuevo producto',
  //     payload,
  //   };
  // }

  // @Put(':idProducto')
  // actualizarProducto(
  //   @Param('idProducto') idProducto: string,
  //   @Body() body: any,
  // ): any {
  //   return {
  //     idProducto: idProducto,
  //     nombre: body.nombre,
  //     precio: body.precio,
  //     calibre: body.calibre,
  //   };
  // }

  // @Delete(':idProduct')
  // deleteProducto(@Param('idProduct') idProduct: string): any {
  //   return {
  //     idProduct: idProduct,
  //     delete: true,
  //     count: 1,
  //   };
  // }
}
