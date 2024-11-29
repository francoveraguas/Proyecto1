import { Producto } from 'src/productos/entities/producto.entity';
import { Operador } from './operador.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comprador } from './comprador.entity';
import { DetallePedido } from './detallepedido.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @ManyToOne(() => Comprador, (comprador) => comprador.pedidos)
  comprador: Comprador;

  @Exclude()
  @OneToMany(() => DetallePedido, (detalle) => detalle.pedido)
  detalles: DetallePedido[];

  @Expose()
  get productos() {
    if (this.detalles) {
      return this.detalles
        .filter((detalle) => !!detalle)
        .map((detalle) => ({
          ...detalle.producto,
          cantidad: detalle.cantidad,
        }));
    }
    return [];
  }

  @Expose()
  get total() {
    if (this.detalles) {
      return this.detalles
        .filter((detalle) => !!detalle)
        .reduce((total, detalle) => {
          const totalDetalle = detalle.producto.precio * detalle.cantidad;
          return total + totalDetalle;
        }, 0);
    }
    return 0;
  }
}
