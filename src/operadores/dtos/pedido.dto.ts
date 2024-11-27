import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePedidoDto {
  @ApiProperty({ description: 'Comprador del pedido' })
  @IsNumber()
  @IsNotEmpty()
  readonly compradorId: number;
}

export class UpdatePedidoDto extends PartialType(CreatePedidoDto) {}
