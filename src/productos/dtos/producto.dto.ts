import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
  ValidateIf,
} from 'class-validator';

export class CreateProductDTO {
  @ApiProperty({ description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @ApiProperty({ description: 'Descripcion del producto' })
  @IsString()
  @IsNotEmpty()
  readonly descripcion: string;

  @ApiProperty({ description: 'Precio del producto' })
  @IsNumber()
  @IsNotEmpty()
  readonly precio: number;

  @ApiProperty({ description: 'Stock del producto' })
  @IsNumber()
  @IsNotEmpty()
  readonly stock: number;

  @ApiProperty({ description: 'Origen del producto' })
  @IsString()
  @IsNotEmpty()
  readonly origen: string;

  @ApiProperty({ description: 'Imagen del producto' })
  @IsUrl()
  @IsNotEmpty()
  readonly imagen: string;

  @ApiProperty({ description: 'ID del Fabricante' })
  @IsNotEmpty()
  @IsPositive()
  readonly fabricanteId: number;

  @ApiProperty({ description: 'Categorias del Producto' })
  @IsNotEmpty()
  @IsArray()
  readonly categoriasIds: number[];
}

export class UpdateProductDTO extends PartialType(
  OmitType(CreateProductDTO, ['nombre']),
) {}

export class FiltroProductosDTO {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @IsString()
  orden: string;

  @IsOptional()
  @IsPositive()
  precioMinimo: number;

  @ValidateIf((item) => item.precioMinimo)
  @IsPositive()
  precioMaximo: number;
}
