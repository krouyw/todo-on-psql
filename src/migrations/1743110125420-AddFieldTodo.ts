import { Logger } from '@nestjs/common'
import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddFieldTodo1743110125420 implements MigrationInterface {
  private readonly logger = new Logger(AddFieldTodo1743110125420.name)

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(
        'ALTER TABLE task ADD COLUMN isEdited BOOLEAN DEFAULT false',
      )
    } catch (error) {
      this.logger.error(`Error in migration up with error=${error}`)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query('ALTER TABLE task DROP COLUMN isEdited')
    } catch (error) {
      this.logger.error(`Error in migration down with error=${error}`)
    }
  }
}
