import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateFabricanteDTO {
  @ApiProperty({ description: 'Nombre del Fabricante' })
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @ApiProperty({ description: 'Direccion del Fabricante' })
  @IsString()
  @IsNotEmpty()
  readonly direccion: string;

  @ApiProperty({ description: 'Email del Fabricante' })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ description: 'Imagen del producto' })
  @IsUrl()
  @IsNotEmpty()
  readonly imagen: string;
}

export class UpdateFabricanteDTO extends PartialType(
  OmitType(CreateFabricanteDTO, ['nombre']),
) {}
