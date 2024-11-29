import {MigrationInterface, QueryRunner} from "typeorm";

export class Noviembre271732738246523 implements MigrationInterface {
    name = 'Noviembre271732738246523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "producto" DROP CONSTRAINT "FK_2bdf10c8cf693441c6f240ad6d5"`);
        await queryRunner.query(`CREATE TABLE "productos_categorias" ("categoria_id" integer NOT NULL, "producto_id" integer NOT NULL, CONSTRAINT "PK_9086c59de4955743f5575f52bb4" PRIMARY KEY ("categoria_id", "producto_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f61bc079f9cb009e4319face80" ON "productos_categorias" ("categoria_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_0f7e8213e5f76aea1385c4c1a5" ON "productos_categorias" ("producto_id") `);
        await queryRunner.query(`ALTER TABLE "producto" ADD "fabricante_id" integer`);
        await queryRunner.query(`CREATE INDEX "IDX_c3bdec19983950497f2ff61589" ON "producto" ("precio") `);
        await queryRunner.query(`ALTER TABLE "producto" ADD CONSTRAINT "FK_460198c94e3236de9fae95451e4" FOREIGN KEY ("fabricante_id") REFERENCES "fabricante"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "productos_categorias" ADD CONSTRAINT "FK_f61bc079f9cb009e4319face80a" FOREIGN KEY ("categoria_id") REFERENCES "categoria"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "productos_categorias" ADD CONSTRAINT "FK_0f7e8213e5f76aea1385c4c1a57" FOREIGN KEY ("producto_id") REFERENCES "producto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "productos_categorias" DROP CONSTRAINT "FK_0f7e8213e5f76aea1385c4c1a57"`);
        await queryRunner.query(`ALTER TABLE "productos_categorias" DROP CONSTRAINT "FK_f61bc079f9cb009e4319face80a"`);
        await queryRunner.query(`ALTER TABLE "producto" DROP CONSTRAINT "FK_460198c94e3236de9fae95451e4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c3bdec19983950497f2ff61589"`);
        await queryRunner.query(`ALTER TABLE "producto" DROP COLUMN "fabricante_id"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0f7e8213e5f76aea1385c4c1a5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f61bc079f9cb009e4319face80"`);
        await queryRunner.query(`DROP TABLE "productos_categorias"`);
        await queryRunner.query(`ALTER TABLE "producto" ADD CONSTRAINT "FK_2bdf10c8cf693441c6f240ad6d5" FOREIGN KEY ("fabricanteId") REFERENCES "fabricante"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
