import { MigrationInterface, QueryRunner } from 'typeorm';

export class Noviembre2221732317029057 implements MigrationInterface {
  name = 'Noviembre2221732317029057';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "detalle_pedido" DROP CONSTRAINT "FK_aa8b9b701049833bf415fdf53d7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "detalle_pedido" RENAME COLUMN "pedidoOperador" TO "pedidoId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pedido" RENAME COLUMN "operador" TO "id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pedido" RENAME CONSTRAINT "PK_0d91f782b04ec57f174c10af59f" TO "PK_af8d8b3d07fae559c37f56b3f43"`,
    );
    await queryRunner.query(
      `ALTER SEQUENCE "pedido_operador_seq" RENAME TO "pedido_id_seq"`,
    );
    await queryRunner.query(
      `ALTER TABLE "detalle_pedido" ADD CONSTRAINT "FK_4d39e79d693b68f9f35cf4238e1" FOREIGN KEY ("pedidoId") REFERENCES "pedido"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "detalle_pedido" DROP CONSTRAINT "FK_4d39e79d693b68f9f35cf4238e1"`,
    );
    await queryRunner.query(
      `ALTER SEQUENCE "pedido_id_seq" RENAME TO "pedido_operador_seq"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pedido" RENAME CONSTRAINT "PK_af8d8b3d07fae559c37f56b3f43" TO "PK_0d91f782b04ec57f174c10af59f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pedido" RENAME COLUMN "id" TO "operador"`,
    );
    await queryRunner.query(
      `ALTER TABLE "detalle_pedido" RENAME COLUMN "pedidoId" TO "pedidoOperador"`,
    );
    await queryRunner.query(
      `ALTER TABLE "detalle_pedido" ADD CONSTRAINT "FK_aa8b9b701049833bf415fdf53d7" FOREIGN KEY ("pedidoOperador") REFERENCES "pedido"("operador") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
