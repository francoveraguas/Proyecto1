import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductosService } from 'src/productos/services/productos.service';
import { Pedido } from '../entities/pedido.entity';
import { Operador } from '../entities/operador.entity';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateOperadorDTO, UpdateOperadorDTO } from '../dtos/operador.dto';

@Injectable()
export class OperadoresService {
  constructor(
    private productsService: ProductosService,
    private configService: ConfigService,
    @InjectRepository(Operador)
    private operadoresRepository: Repository<Operador>,
    @Inject('PG') private clientPG: Client,
  ) {}

  // private idCounter = 1;
  // private operadores: Operador[] = [
  //   {
  //     id: 1,
  //     email: 'prueba@hotmail.com',
  //     password: 'contraseña',
  //     role: 'Desarrollador',
  //   },
  // ];
  create(nuevoOperador: CreateOperadorDTO): Promise<Operador> {
    const operador = this.operadoresRepository.create(nuevoOperador);
    return this.operadoresRepository.save(operador);
  }

  async update(
    id: number,
    updatedOperador: UpdateOperadorDTO,
  ): Promise<Operador> {
    const operador = await this.findOne(id);
    if (!operador) {
    }
    const mergedOperador = this.operadoresRepository.merge(
      operador,
      updatedOperador,
    );
    return this.operadoresRepository.save(mergedOperador);
  }
  remove(id: number): Promise<DeleteResult> {
    return this.operadoresRepository.delete(id);
  }

  async findOne(id: number): Promise<Operador> {
    return this.operadoresRepository.findOne({
      where: { id },
    });
  }
  // findOne(id: number) {
  //   const operador = this.operadores.find((item) => item.id === id);
  //   if (!operador) {
  //     throw new NotFoundException(`El operador con id: #${id} no existe`);
  //   }
  //   return operador;
  // }

  async findAll(): Promise<Operador[]> {
    const apiKey = this.configService.get('APIKEY');
    const dbName = this.configService.get('DB_NAME');
    console.log(apiKey, dbName);
    return this.operadoresRepository.find();
  }
  // findAll() {
  //   const apiKey = this.configService.get('APIKEY');
  //   const dbName = this.configService.get('DB_NAME');
  //   console.log(apiKey, dbName);
  //   return this.operadores;
  // }

  async getOrderByUser(id: number) {
    const operador = this.findOne(id);
    return {
      date: new Date(),
      operador,
      products: await this.productsService.findAll(),
    };
  }
  // getOrderByUser(id: number): Pedido {
  //   const operador = this.findOne(id);
  //   return {
  //     date: new Date(),
  //     operador,
  //     productos: this.productsService.findAll(),
  //   };
  // }

  getTareas() {
    return new Promise((resolve, reject) => {
      this.clientPG.query('SELECT * FROM tareas', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}
