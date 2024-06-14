import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Fabricantes')
@Controller('fabricantes')
export class FabricantesController {
  @Get()
  getProducts(
    @Query('id') id = 1,
    @Query('nombre') nombre = 'ACME',
    @Query('origen') origen: string,
  ) {
    return `El fabricante ${nombre} con ID: ${id}, procede de ${origen}.`;
  }
  @Get(':nombre/productos/:idProducto')
  getCategory(
    @Param('nombre') nombre: string,
    @Param('idProducto') idProducto: string,
  ) {
    return `El ID del producto es ${idProducto}, del fabricante ${nombre}.`;
  }
}
