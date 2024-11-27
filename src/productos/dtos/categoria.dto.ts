import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoriaDTO {
  @ApiProperty({ description: 'Nombre de la Categoria' })
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;
}

export class UpdateCategoriaDTO extends PartialType(
  OmitType(CreateCategoriaDTO, ['nombre']),
) {}
