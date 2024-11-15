import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OperadoresService } from '../services/operadores.service';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { ApiTags } from '@nestjs/swagger';
import { Operador } from '../entities/operador.entity';
import { CreateOperadorDTO, UpdateOperadorDTO } from '../dtos/operador.dto';
import { DeleteResult } from 'typeorm';

@ApiTags('Operadores')
@Controller('operadores')
export class OperadoresController {
  constructor(private operadoresService: OperadoresService) {}

  @Get()
  findAll() {
    return this.operadoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Operador> {
    return this.operadoresService.findOne(id);
  }

  @Post()
  create(@Body() nuevoOperador: CreateOperadorDTO) {
    return this.operadoresService.create(nuevoOperador);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() operador: UpdateOperadorDTO,
  ) {
    return this.operadoresService.update(id, operador);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.operadoresService.remove(id);
  }

  // @Get()
  // getOperadores() {
  //   return this.operadoresService.findAll();
  // }

  @Get(':id/pedidos')
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.operadoresService.getOrderByUser(id);
  }

  // @Get('tareas')
  // getTareas() {
  //   return this.operadoresService.getTareas();
  // }
}
