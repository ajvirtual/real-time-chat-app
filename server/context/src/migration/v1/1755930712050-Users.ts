import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1755930712050 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const response = await queryRunner.query(`
            INSERT INTO t_user (
                id, userName, userNameTolower, email, password, resetPasswordCode, resetPasswordToken, 
                dateResetPasswordCreated, dateEditPassword, dateInscriptionConfirmed, dateInscriptionToken, 
                dateBirth, birthPlace, inscriptionToken, isDisabled, disableReason, firstName, lastName, 
                preferredName, fullName, sexe, nationality, language, address, phone, whatsappNumber, 
                notificationEmail, profilePublic, companyName, companyPosition, createdAt
            )
            VALUES 
                (1, 'Alice', 'alice', 'alice@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 
                '1990-01-01', 'Wonderland', NULL, 0, NULL, 'Alice', 'Doe', NULL, 'Alice Doe', 'FEMALE', 
                'Wonderland', 'English', '123 Wonderland St', '1234567890', NULL, 1, 1, 'Wonderland Inc.', 
                'CEO', NOW()),
                
                (2, 'Bob', 'bob', 'bob@example.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 
                '1985-05-15', 'Dreamland', NULL, 0, NULL, 'Bob', 'Smith', NULL, 'Bob Smith', 'MALE', 
                'Dreamland', 'English', '456 Dreamland Ave', '0987654321', NULL, 1, 1, 'Dreamland Ltd.', 
                'CTO', NOW());
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM t_user WHERE id IN (1, 2);
        `);
    }
}