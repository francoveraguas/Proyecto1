import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FabricantesService } from '../services/fabricantes.service';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import {
  CreateFabricanteDTO,
  UpdateFabricanteDTO,
} from '../dtos/fabricante.dto';

@ApiTags('Fabricantes')
@Controller('fabricantes')
export class FabricantesController {
  constructor(private fabricantesService: FabricantesService) {}

  @Get()
  findAll() {
    return this.fabricantesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.fabricantesService.findOne(id);
  }

  @Post()
  create(@Body() nuevoFabricante: CreateFabricanteDTO) {
    return this.fabricantesService.create(nuevoFabricante);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() fabricante: UpdateFabricanteDTO,
  ) {
    return this.fabricantesService.update(id, fabricante);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.fabricantesService.remove(id);
  }
  // @Get()
  // getProducts(
  //   @Query('id') id = 1,
  //   @Query('nombre') nombre = 'ACME',
  //   @Query('origen') origen: string,
  // ) {
  //   return `El fabricante ${nombre} con ID: ${id}, procede de ${origen}.`;
  // }
  // @Get(':nombre/productos/:idProducto')
  // getCategory(
  //   @Param('nombre') nombre: string,
  //   @Param('idProducto') idProducto: string,
  // ) {
  //   return `El ID del producto es ${idProducto}, del fabricante ${nombre}.`;
  // }
}
