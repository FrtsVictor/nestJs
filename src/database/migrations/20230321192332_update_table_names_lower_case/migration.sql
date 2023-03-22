/*
  Warnings:

  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User_Roles` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[User_Roles] DROP CONSTRAINT [User_Roles_role_id_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[User_Roles] DROP CONSTRAINT [User_Roles_user_id_fkey];

-- DropTable
DROP TABLE [dbo].[Role];

-- DropTable
DROP TABLE [dbo].[User];

-- DropTable
DROP TABLE [dbo].[User_Roles];

-- CreateTable
CREATE TABLE [dbo].[user] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(50) NOT NULL,
    [email] NVARCHAR(150) NOT NULL,
    [password] NVARCHAR(150) NOT NULL,
    CONSTRAINT [user_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[role] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(30) NOT NULL,
    CONSTRAINT [role_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[user_roles] (
    [user_id] INT NOT NULL,
    [role_id] INT NOT NULL,
    [assignedAt] DATETIME2 NOT NULL CONSTRAINT [user_roles_assignedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [user_roles_pkey] PRIMARY KEY CLUSTERED ([role_id],[user_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[user_roles] ADD CONSTRAINT [user_roles_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[user]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[user_roles] ADD CONSTRAINT [user_roles_role_id_fkey] FOREIGN KEY ([role_id]) REFERENCES [dbo].[role]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
