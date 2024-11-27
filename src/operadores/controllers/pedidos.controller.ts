import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PedidosService } from '../services/pedidos.service';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { CreatePedidoDto, UpdatePedidoDto } from '../dtos/pedido.dto';

@ApiTags('Pedidos')
@Controller('pedidos')
export class PedidosController {
  constructor(private pedidosService: PedidosService) {}

  @Get()
  findAll() {
    return this.pedidosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pedidosService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreatePedidoDto) {
    return this.pedidosService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdatePedidoDto,
  ) {
    return this.pedidosService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pedidosService.remove(id);
    // return this.pedidosService.remove(+id);
  }
}
