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

@Module({
  controllers: [OperadoresController, CompradoresController, PedidosController],
  providers: [OperadoresService, CompradoresService],
  imports: [
    ProductosModule,
    TypeOrmModule.forFeature([Comprador, Operador, Pedido, Producto]),
  ],
})
export class OperadoresModule {}
