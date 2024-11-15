import { MigrationInterface, QueryRunner } from 'typeorm';

export class inicio1718552542163 implements MigrationInterface {
  name = 'inicio1718552542163';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "producto" DROP COLUMN "createAt"`);
    await queryRunner.query(`ALTER TABLE "producto" DROP COLUMN "updateAt"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "producto" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "producto" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }
}
