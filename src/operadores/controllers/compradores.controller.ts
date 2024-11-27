import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompradoresService } from '../services/compradores.service';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { CreateCompradorDTO, UpdateCompradorDTO } from '../dtos/comprador.dto';

@ApiTags('Compradores')
@Controller('compradores')
export class CompradoresController {
  constructor(private compradoresService: CompradoresService) {}

  @Get()
  findAll() {
    return this.compradoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.compradoresService.findOne(id);
  }

  @Post()
  create(@Body() nuevoComprador: CreateCompradorDTO) {
    return this.compradoresService.create(nuevoComprador);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() comprador: UpdateCompradorDTO,
  ) {
    return this.compradoresService.update(id, comprador);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.compradoresService.remove(id);
  }
}
