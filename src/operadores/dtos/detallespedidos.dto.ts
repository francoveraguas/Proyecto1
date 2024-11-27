import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsPositive, IsNotEmpty } from 'class-validator';

export class CreateDetallesPedidosDto {
  @ApiProperty({ description: 'Pedido ID' })
  @IsPositive()
  @IsNotEmpty()
  pedidoId: number;

  @ApiProperty({ description: 'Producto ID' })
  @IsPositive()
  @IsNotEmpty()
  productoId: number;

  @ApiProperty({ description: 'Cantidad' })
  @IsPositive()
  @IsNotEmpty()
  cantidad: number;
}

export class UpdateDetallesPedidosDto extends PartialType(
  CreateDetallesPedidosDto,
) {}
