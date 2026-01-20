import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1768875738887 implements MigrationInterface {
    name = 'InitialSchema1768875738887'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Enable UUID extension
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        // Create categories table
        await queryRunner.query(`
            CREATE TABLE "categories" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" text NOT NULL,
                "description" text,
                "is_active" boolean NOT NULL DEFAULT true,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_categories_name" UNIQUE ("name"),
                CONSTRAINT "PK_categories" PRIMARY KEY ("id")
            )
        `);

        // Create words table
        await queryRunner.query(`
            CREATE TABLE "words" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "value" text NOT NULL,
                "is_active" boolean NOT NULL DEFAULT true,
                "category_id" uuid NOT NULL,
                "difficulty" text,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_words" PRIMARY KEY ("id")
            )
        `);

        // Add foreign key constraint
        await queryRunner.query(`
            ALTER TABLE "words" 
            ADD CONSTRAINT "FK_words_category" 
            FOREIGN KEY ("category_id") 
            REFERENCES "categories"("id") 
            ON DELETE CASCADE 
            ON UPDATE NO ACTION
        `);

        // Create indexes for performance
        await queryRunner.query(`CREATE INDEX "IDX_words_category_id" ON "words" ("category_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_words_is_active" ON "words" ("is_active")`);
        await queryRunner.query(`CREATE INDEX "IDX_categories_is_active" ON "categories" ("is_active")`);

        // Create unique constraint for words per category
        await queryRunner.query(`
            CREATE UNIQUE INDEX "IDX_words_unique_value_per_category" 
            ON "words" ("category_id", LOWER("value"))
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop indexes
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_words_unique_value_per_category"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_categories_is_active"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_words_is_active"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "IDX_words_category_id"`);

        // Drop foreign key
        await queryRunner.query(`ALTER TABLE "words" DROP CONSTRAINT IF EXISTS "FK_words_category"`);

        // Drop tables
        await queryRunner.query(`DROP TABLE IF EXISTS "words"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "categories"`);
    }
}
