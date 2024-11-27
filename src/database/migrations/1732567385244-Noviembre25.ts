import {MigrationInterface, QueryRunner} from "typeorm";

export class Noviembre251732567385244 implements MigrationInterface {
    name = 'Noviembre251732567385244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedido" ADD "date" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedido" DROP COLUMN "date"`);
    }

}
