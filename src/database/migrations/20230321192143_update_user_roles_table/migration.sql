/*
  Warnings:

  - You are about to drop the `_RoleToUser` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[_RoleToUser] DROP CONSTRAINT [_RoleToUser_A_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[_RoleToUser] DROP CONSTRAINT [_RoleToUser_B_fkey];

-- DropTable
DROP TABLE [dbo].[_RoleToUser];

-- CreateTable
CREATE TABLE [dbo].[User_Roles] (
    [user_id] INT NOT NULL,
    [role_id] INT NOT NULL,
    [assignedAt] DATETIME2 NOT NULL CONSTRAINT [User_Roles_assignedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [User_Roles_pkey] PRIMARY KEY CLUSTERED ([role_id],[user_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[User_Roles] ADD CONSTRAINT [User_Roles_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[User_Roles] ADD CONSTRAINT [User_Roles_role_id_fkey] FOREIGN KEY ([role_id]) REFERENCES [dbo].[Role]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
