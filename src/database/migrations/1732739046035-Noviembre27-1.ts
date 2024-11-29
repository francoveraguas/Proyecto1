import {MigrationInterface, QueryRunner} from "typeorm";

export class Noviembre2711732739046035 implements MigrationInterface {
    name = 'Noviembre2711732739046035'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "operador" DROP CONSTRAINT "FK_9a6bd793b4f149fb11d8692ed75"`);
        await queryRunner.query(`ALTER TABLE "operador" RENAME COLUMN "compradorId" TO "comprador_id"`);
        await queryRunner.query(`ALTER TABLE "operador" RENAME CONSTRAINT "UQ_9a6bd793b4f149fb11d8692ed75" TO "UQ_f2c59774661db02f747afa2e01f"`);
        await queryRunner.query(`ALTER TABLE "operador" ADD CONSTRAINT "FK_f2c59774661db02f747afa2e01f" FOREIGN KEY ("comprador_id") REFERENCES "comprador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "operador" DROP CONSTRAINT "FK_f2c59774661db02f747afa2e01f"`);
        await queryRunner.query(`ALTER TABLE "operador" RENAME CONSTRAINT "UQ_f2c59774661db02f747afa2e01f" TO "UQ_9a6bd793b4f149fb11d8692ed75"`);
        await queryRunner.query(`ALTER TABLE "operador" RENAME COLUMN "comprador_id" TO "compradorId"`);
        await queryRunner.query(`ALTER TABLE "operador" ADD CONSTRAINT "FK_9a6bd793b4f149fb11d8692ed75" FOREIGN KEY ("compradorId") REFERENCES "comprador"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
