import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCompradorDTO {
  // @ApiProperty({ description: 'ID del Comprador' })
  // @IsNumber()
  // readonly id: number;

  @ApiProperty({ description: 'Nombre del Comprador' })
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @ApiProperty({ description: 'Apellido del Comprador' })
  @IsString()
  @IsNotEmpty()
  readonly apellido: string;

  @ApiProperty({ description: 'Telefono del Comprador' })
  @IsString()
  @IsNotEmpty()
  readonly telefono: string;

  // @ApiProperty({ description: 'Fecha de Creación del Registro' })
  // @IsDate()
  // readonly createAt: Date;

  // @ApiProperty({ description: 'Fecha de Actualización del Registro' })
  // @IsDate()
  // readonly updateAt: Date;
}

export class UpdateCompradorDTO extends PartialType(
  OmitType(CreateCompradorDTO, ['nombre', 'apellido']),
) {}
