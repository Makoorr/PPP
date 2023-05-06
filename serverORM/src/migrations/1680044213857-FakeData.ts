import { MigrationInterface, QueryRunner } from "typeorm"

export class FakeData1680044213857 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`use ${process.env.DB_NAME};`);
        // Generate fake data for User table
        await queryRunner.query(`SET GLOBAL foreign_key_checks = 0;`);
        
        // Generate fake data for User table
        await queryRunner.query(`INSERT IGNORE INTO user (id, login, password, name) VALUES (1, 'john.doe', 'password', 'John Doe')
        ,(2, 'jane.doe', 'password', 'Jane Doe')`);

        // Generate fake data for Project table
        await queryRunner.query(
            `INSERT IGNORE INTO project (name, description, userId) VALUES ('Project A', 'Description for Project A', 1)
            ,('Project B', 'Description for Project B', 1)
            ,('Project C', 'Description for Project C', 2)
            ,('Project D', 'Description for Project D', 2)`);

        // Generate fake data for Section table
        await queryRunner.query(`INSERT IGNORE INTO section (name, description, projectId) VALUES ('Section 1', 'Description for Section 1', 1)
        ,('Section 2', 'Description for Section 2', 1)
        ,('Section 3', 'Description for Section 3', 2)
        ,('Section 4', 'Description for Section 4', 2)
        ,('Section 5', 'Description for Section 5', 3)
        ,('Section 6', 'Description for Section 6', 3)
        ,('Section 7', 'Description for Section 7', 4)
        ,('Section 8', 'Description for Section 8', 4)`);

        // Generate fake data for Task table
        await queryRunner.query(`INSERT IGNORE INTO task (name, description, priority, deadline, sectionId) VALUES ('Task 1', 'Description for Task 1', 1, '2023-03-30', 1)
        ,('Task 2', 'Description for Task 2', 2, '2023-03-31', 1)
        ,('Task 3', 'Description for Task 3', 3, '2023-04-01', 2)
        ,('Task 4', 'Description for Task 4', 1, '2023-04-02', 2)
        ,('Task 5', 'Description for Task 5', 2, '2023-04-03', 3)
        ,('Task 6', 'Description for Task 6', 3, '2023-04-04', 3)
        ,('Task 7', 'Description for Task 7', 1, '2023-04-05', 4)
        ,('Task 8', 'Description for Task 8', 2, '2023-04-06', 4)
        ,('Task 9', 'Description for Task 9', 3, '2023-04-07', 5)
        ,('Task 10', 'Description for Task 10', 1, '2023-04-08', 5)
        ,('Task 11', 'Description for Task 11', 2, '2023-04-09', 6)
        ,('Task 12', 'Description for Task 12', 3, '2023-04-10', 6)
        ,('Task 13', 'Description for Task 13', 1, '2023-04-11', 7)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`SET GLOBAL foreign_key_checks = 0;`);
        await queryRunner.query(`TRUNCATE TABLE Task`);
        await queryRunner.query(`TRUNCATE TABLE Section`);
        await queryRunner.query(`TRUNCATE TABLE Project`);
        await queryRunner.query(`TRUNCATE TABLE User`);
        await queryRunner.query(`SET foreign_key_checks = 1;`);
        
        // Reset Sequence id values for all tables
        await queryRunner.query(`ALTER TABLE user AUTO_INCREMENT = 1`);
        await queryRunner.query(`ALTER TABLE project AUTO_INCREMENT = 1`);
        await queryRunner.query(`ALTER TABLE section AUTO_INCREMENT = 1`);
        await queryRunner.query(`ALTER TABLE task AUTO_INCREMENT = 1`);
    }
}