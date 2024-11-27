import { Body, Controller, Post } from '@nestjs/common';
import { DetallesPedidosService } from '../services/detallesPedidos.service';
import { CreateDetallesPedidosDto } from '../dtos/detallespedidos.dto';

@Controller('detalles-pedidos')
export class DetallespedidosController {
  constructor(private detallesService: DetallesPedidosService) {}

  @Post()
  create(@Body() data: CreateDetallesPedidosDto) {
    return this.detallesService.create(data);
  }
}
