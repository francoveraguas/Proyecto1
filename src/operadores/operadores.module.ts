import { Module } from '@nestjs/common';
import { ProductosModule } from 'src/productos/productos.module';
import { OperadoresController } from './controllers/operadores.controller';
import { CompradoresController } from './controllers/compradores.controller';
import { CompradoresService } from './services/compradores.service';
import { OperadoresService } from './services/operadores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comprador } from './entities/comprador.entity';
import { Operador } from './entities/operador.entity';
import { Pedido } from './entities/pedido.entity';
import { Producto } from 'src/productos/entities/producto.entity';
import { PedidosController } from './controllers/pedidos.controller';
import { DetallePedido } from './entities/detallepedido.entity';
import { PedidosService } from './services/pedidos.service';
import { DetallespedidosController } from './controllers/detallespedidos.controller';
import { DetallesPedidosService } from './services/detallesPedidos.service';

@Module({
  controllers: [
    OperadoresController,
    CompradoresController,
    PedidosController,
    DetallespedidosController,
  ],
  providers: [
    OperadoresService,
    CompradoresService,
    PedidosService,
    DetallesPedidosService,
  ],
  imports: [
    ProductosModule,
    TypeOrmModule.forFeature([
      Comprador,
      DetallePedido,
      Operador,
      Pedido,
      Producto,
    ]),
  ],
})
export class OperadoresModule {}
