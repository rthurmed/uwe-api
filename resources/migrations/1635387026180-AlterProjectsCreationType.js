const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class AlterProjectsCreationType1635387026180 {

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE projects DROP COLUMN creation;
            ALTER TABLE projects ADD COLUMN created_at DATE NOT NULL DEFAULT CURRENT_DATE;
        `)
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE projects ADD COLUMN creation TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;
            ALTER TABLE projects DROP COLUMN created_at;
        `)
    }
}
        