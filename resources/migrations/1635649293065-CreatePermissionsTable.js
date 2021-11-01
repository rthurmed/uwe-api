const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class CreatePermissionsTable1635649293065 {

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS access_permissions (
                id BIGSERIAL NOT NULL PRIMARY KEY,
                access_level SMALLINT NOT NULL DEFAULT -1,
                user_id VARCHAR,
                project_id BIGINT,
                revoked BOOLEAN DEFAULT FALSE,
                is_invite BOOLEAN DEFAULT TRUE,
                revoked_at TIMESTAMP NULL DEFAULT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_DATE
            );
            
            ALTER TABLE access_permissions
                ADD CONSTRAINT FK_permissions_projects FOREIGN KEY (project_id)
                    REFERENCES projects (id)
                    ON DELETE CASCADE;
        `)
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE access_permissions;
        `)
    }
}
        