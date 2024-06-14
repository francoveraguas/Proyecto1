import { Producto } from 'src/productos/entities/producto.entity';
import { Operador } from './operador.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pedido {
  @Column()
  date: Date;

  @PrimaryGeneratedColumn()
  operador: Operador;

  //   @Column()
  //   productos: Producto;
}
