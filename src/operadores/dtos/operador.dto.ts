import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOperadorDTO {
  @ApiProperty({ description: 'E-mail del Operador' })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ description: 'Clave del Operador' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ description: 'Rol del Operador' })
  @IsString()
  @IsNotEmpty()
  readonly role: string;
}

export class UpdateOperadorDTO extends PartialType(
  OmitType(CreateOperadorDTO, ['email']),
) {}
