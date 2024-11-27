import { MigrationInterface, QueryRunner } from 'typeorm';

export class Noviembre2211732316542648 implements MigrationInterface {
  name = 'Noviembre2211732316542648';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "detalle_pedido" ADD "cantidad" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "detalle_pedido" DROP COLUMN "cantidad"`,
    );
  }
}
