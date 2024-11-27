import { MigrationInterface, QueryRunner } from 'typeorm';

export class Noviembre221732316307159 implements MigrationInterface {
  name = 'Noviembre221732316307159';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "detalle_pedido" ("id" SERIAL NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "productoId" integer, "pedidoOperador" integer, CONSTRAINT "PK_123bec7ab52f5db0a11766f87c0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "pedido" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "pedido" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "pedido" ADD "compradorId" integer`);
    await queryRunner.query(
      `ALTER TABLE "pedido" ADD CONSTRAINT "FK_0d3726ab0e7395e7ffc159dbbbf" FOREIGN KEY ("compradorId") REFERENCES "comprador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "detalle_pedido" ADD CONSTRAINT "FK_aa6bb17cb0e47d62ace803293eb" FOREIGN KEY ("productoId") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "detalle_pedido" ADD CONSTRAINT "FK_aa8b9b701049833bf415fdf53d7" FOREIGN KEY ("pedidoOperador") REFERENCES "pedido"("operador") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "detalle_pedido" DROP CONSTRAINT "FK_aa8b9b701049833bf415fdf53d7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "detalle_pedido" DROP CONSTRAINT "FK_aa6bb17cb0e47d62ace803293eb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pedido" DROP CONSTRAINT "FK_0d3726ab0e7395e7ffc159dbbbf"`,
    );
    await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "compradorId"`);
    await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "updateAt"`);
    await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "createAt"`);
    await queryRunner.query(`DROP TABLE "detalle_pedido"`);
  }
}
