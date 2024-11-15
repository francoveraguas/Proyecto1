import { MigrationInterface, QueryRunner } from 'typeorm';

export class nuevosCamposProducto1718552572424 implements MigrationInterface {
  name = 'nuevosCamposProducto1718552572424';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "producto" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "producto" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "producto" DROP COLUMN "updateAt"`);
    await queryRunner.query(`ALTER TABLE "producto" DROP COLUMN "createAt"`);
  }
}
