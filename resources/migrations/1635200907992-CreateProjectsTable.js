const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CreateProjectsTable1635200907992 {

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS projects (
                id BIGSERIAL NOT NULL PRIMARY KEY,
                name VARCHAR,
                creation TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            );
        `)
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE projects;
        `)
    }
}
        